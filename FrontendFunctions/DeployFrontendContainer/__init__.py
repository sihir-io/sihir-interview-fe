import azure.functions as func
import requests
import os
import time
import json

def create_deployment(headers, KUBE_API_URL, client_name):
    deployment_name = f"sihir-frontend-{client_name}" 

    deployment_data = {
        "apiVersion": "apps/v1",
        "kind": "Deployment",
        "metadata": {
            "name": deployment_name
        },
        "spec": {
            "replicas": 1,
            "selector": {
                "matchLabels": {
                    "app": "sihir-frontend"
                }
            },
            "template": {
                "metadata": {
                    "labels": {
                        "app": "sihir-frontend"
                    }
                },
                "spec": {
                    "containers": [{
                        "name": "sihir-frontend",
                        "image": "sihirimage.azurecr.io/sihir_interview_fe:latest"
                    }]
                }
            }
        }
    }

    response = requests.post(KUBE_API_URL + "/apis/apps/v1/namespaces/default/deployments", json=deployment_data, headers=headers, verify=False)
    return response

def create_ingress(headers, KUBE_API_URL, client_name):
    ingress_data = {
        "apiVersion": "networking.k8s.io/v1",
        "kind": "Ingress",
        "metadata": {
            "name": f"{client_name}-ingress",
            "annotations": {
                "kubernetes.io/ingress.class": "nginx",
                "cert-manager.io/cluster-issuer": "letsencrypt-prod"
            }
        },
        "spec": {
            "tls": [{
                "hosts": [f"{client_name}.sihir.io"],
                "secretName": f"{client_name}-tls"
            }],
            "rules": [{
                "host": f"{client_name}.sihir.io",
                "http": {
                    "paths": [{
                        "path": "/",
                        "pathType": "Prefix",
                        "backend": {
                            "service": {
                                "name": "sihir-frontend-service",
                                "port": {
                                    "number": 3000
                                }
                            }
                        }
                    }]
                }
            }]
        }
    }
    
    ingress_response = requests.post(
        KUBE_API_URL + "/apis/networking.k8s.io/v1/namespaces/default/ingresses",  # Adjusted the API endpoint
        json=ingress_data, 
        headers=headers, 
        verify=False
    )
    return ingress_response

def main(req: func.HttpRequest) -> func.HttpResponse:
    client_name = req.params.get('client_name')
    if not client_name:
        return func.HttpResponse("Client name not provided", status_code=400)

    KUBE_API_URL = os.environ.get('KUBE_API_URL')  # Make sure to set this as an environment variable in your function app
    SERVICE_ACCOUNT_TOKEN = os.environ.get('SERVICE_ACCOUNT_TOKEN')  # Securely store and retrieve this, don't hard-code.

    headers = {
        'Authorization': f'Bearer {SERVICE_ACCOUNT_TOKEN}',
        'Content-Type': 'application/json'
    }

    deployment_response = create_deployment(headers, KUBE_API_URL, client_name)

    if deployment_response.status_code in [200, 201]:
        # Wait for a bit to ensure deployment creates a pod
        time.sleep(10)
    else:
        return func.HttpResponse(f"Error deploying frontend container: {deployment_response.text}", status_code=500)

    ingress_response = create_ingress(headers, KUBE_API_URL, client_name)
    
    if ingress_response.status_code in [200, 201]:
        return func.HttpResponse(f"https://{client_name}.sihir.io")
    else:
        return func.HttpResponse(f"Error deploying Ingress for {client_name}: {ingress_response.text}", status_code=500)
