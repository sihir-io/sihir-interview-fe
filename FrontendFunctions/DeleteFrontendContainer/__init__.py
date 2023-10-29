import azure.functions as func
import requests
import os

def delete_deployment(headers, KUBE_API_URL, client_name):
    deployment_name = "sihir-frontend-" + client_name
    response = requests.delete(
        KUBE_API_URL + f"/apis/apps/v1/namespaces/default/deployments/{deployment_name}",
        headers=headers, 
        verify=False
    )
    return response

def delete_ingress(headers, KUBE_API_URL, client_name):
    ingress_name = f"{client_name}-ingress"
    response = requests.delete(
        KUBE_API_URL + f"/apis/networking.k8s.io/v1/namespaces/default/ingresses/{ingress_name}",
        headers=headers, 
        verify=False
    )
    return response

def main(req: func.HttpRequest) -> func.HttpResponse:
    client_name = req.params.get('client_name')
    if not client_name:
        return func.HttpResponse("Client name not provided", status_code=400)

    KUBE_API_URL = os.environ.get('KUBE_API_URL')
    SERVICE_ACCOUNT_TOKEN = os.environ.get('SERVICE_ACCOUNT_TOKEN')

    headers = {
        'Authorization': f'Bearer {SERVICE_ACCOUNT_TOKEN}',
        'Content-Type': 'application/json'
    }

    deployment_response = delete_deployment(headers, KUBE_API_URL, client_name)
    
    if deployment_response.status_code != 200:
        return func.HttpResponse(f"Error deleting frontend container deployment for {client_name}: {deployment_response.text}", status_code=500)

    ingress_response = delete_ingress(headers, KUBE_API_URL, client_name)
    
    if ingress_response.status_code != 200:
        return func.HttpResponse(f"Error deleting Ingress for {client_name}: {ingress_response.text}", status_code=500)

    return func.HttpResponse(f"All resources for {client_name} have been deleted successfully.")
