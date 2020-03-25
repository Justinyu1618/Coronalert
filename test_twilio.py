# Download the helper library from https://www.twilio.com/docs/python/install
from twilio.rest import Client


# Your Account Sid and Auth Token from twilio.com/console
# DANGER! This is insecure. See http://twil.io/secure
account_sid = 'AC8f73ee090e440b4d35b1020952e45fed'
auth_token = 'a44b6f0e435130ba7b6f87f2bbf759a4'
client = Client(account_sid, auth_token)

message = client.messages \
                .create(
                     body="Join Earth's mightiest heroes. Like Kevin Bacon.",
                     from_='+12058467029',
                     to='+16179570655'
                 )

print(message.sid)
