# api/views.py
from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import RegisterSerializer
import logging

logger = logging.getLogger(__name__)


@api_view(['POST'])
def login_view(request):
	username = request.data.get('username')
	password = request.data.get('password')
	
	user = authenticate(username=username, password=password)
	
	if user is not None:
		return Response({'message': 'Login successful'}, status=status.HTTP_200_OK)
	else:
		return Response({'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
def register_view(request):
	serializer = RegisterSerializer(data=request.data)
	if serializer.is_valid():
		try:
			serializer.save()
			return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)
		except Exception as e:
			logger.error(f"Error saving user: {e}")
			return Response({'error': 'An error occurred while saving the user.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
	logger.error(f"Invalid data: {serializer.errors}")
	return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
