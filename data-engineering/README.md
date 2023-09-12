# API
Property Syle Categories:

1: Condomonium or Apartment
2: Row house (Row town house)
3: Semi Detatched (Bungalow)
4. Single Family Detatched

Age -> Years
SizeBuild & LotSize -> Sqm

### First: Postal Code Charecteristics:
The data is hosted in dynamo DB and it is connected to AWS API Gateway through AWS Lambda function:

```javascript
API: https://5v479nrmxh.execute-api.us-east-2.amazonaws.com/v1/postalcode
send post request with parameter postalcode. For example:

{ 
  "password" : "$2b$12$5BfAv3A4ia8wZAVyYpyivOfrEbCA88tc6RJJIDIcig00iTIMt/vwe",  ,
  "postalcode": "M1B0A1"
}

Error handling: 
If (length of postal code is not equal to 6 charecters):
    The API will return 'not a valid postalcode'
else:
    If (postalcode is present in the dynamodb (contains 764863 postalcodes)):
        The API will return the corresponding values
    else:
        If (FSA (first three digits of postalcode) is present in the dynamodb (contains 1629 FSA)):
            The API will return value at FSA level
        else:
            If (FSA (first digit of postalcode) is present in the dynamodb (contains 18 Provinces)):
                The API will return value at Province level
            else: 
                The API will return 'not a valid postalcode'
```

#### Next Steps:
* Authentication to the API

### Second: House Price Prediction using ML model and RPS Estimates: (its live)
ML model: The data and model are hosted in a container in EC2 instance. Plumber package is used to host the web API. 
RPS: The data is hosted in Dynamo DB.
The request first goes to the AWS API Gateway Endpoint that is connected to AWS Lambda. The Lambda up on receiving the request will send it to the model deployed in ec2 instance and if there is an error it will call the RPS data hosted in Dynamo DB.

```javascript
HTTPS API: https://jtvkwsm3w8.execute-api.us-east-2.amazonaws.com/v1/houseprice
send post request with parameters:

{"password" : "$2b$12$5BfAv3A4ia8wZAVyYpyivOfrEbCA88tc6RJJIDIcig00iTIMt/vwe",
"postalCode":"L9T0J7",
"propertyStyle":4,
"fsa":"L9T",
"province":"ON",
"propertyAge":25,
"sizeBuild":228,
"sizeLot":112,
"propertyTax":450}

Error handling: 
If (length of postal code is not equal to 6 charecters):
    The API will return 'not a valid postalcode'
else:
  If (postal code property style works in ML model):
      The API will return model prediction
  else :
    If (FSA and property style works in ML model):
        The API will return model prediction
    else:
        If (postalcode and property style combination is present in the RPS (contains 1,127,770 combinations)):
            The API will return the corresponding values
        else:
            If (FSA (first three digits of postalcode) and property style combination is present in the RPS (contains 1629 FSA)):
                The API will return value at FSA level
            else: 
                If (FSA (first three digits of postalcode) and property style combination is present in the RPS (contains 1629 FSA)):
                    The API will return value at FSA level
                else:
                    The API will return "Invalid Postal code & PropertyStyle combination"
simply put:
Model (Postal Code & Property Type) > Model (FSA & Property Type) > RPS (Postal Code & Property Type) > RPS (FSA & Property Type) > RPS (Province & Property Type).
```

#### Next Steps:
* authentication to the API
* Remove the dyanamo DB

### Fourth: Pre Qualify for Mortgage: (its live)

```javascript
Data To be Received in this format:
Page 1:
> Full Legal Name: 
> Date of Birth year --> send the 'year'
> Property Address (pull from current property details page in background) --> send the postal code as 'postalcode', province as 'province'
> Property Type (pull from current property details page in background) ---> send as 'property_type'
> Property Price (pull from current property details page in background) --> send as 'property_price'
> Downpayment (as percentage of sale price) and show the calculated dollar --> send as 'downpayment' 
> Desired Amortization only two possibilities 25 or 30 years --> send as 'amortization' as 25 or 30 number. 
> Expected Monthly Property Tax --> send as 'monthly_property_tax'
> Expected Monthly Heating Bill --> send as 'monthly_heating_bill'
> Co-borrower (if any) --> send as 'coborrower' 'yes' or 'no'.  
> Is this your rental property? --> send as 'rental_purpose' 'yes' or 'no'. 

Page 2:
> Self Employed  --> send 'self_employed' 'yes' or 'no'. 
> resident of canada for tax purposes --> if 'yes' send 'foreign_buyer' as 'no', if the answer is 'no' send 'foreign_buyer' as 'yes'
> How many years with your most recent employer --> send as 'job_tenure'
> Monthly Salary or Income --> send as 'monthly_salary'
> Monthly Other Income --> send as 'monthly_other_income'
> Gross Annual Income from all Sources --> send as 'gross_annual_income'. if none send zero
> Expected Credit Card Payments (if any) --> send as 'credit_card_Payments'. if none send zero
> Monthly Car Payments (if any) --> send as 'monthly_car_payments'. if none send zero
> Monthly Personal Loan Payments (if any)  --> send as 'personal_loan_payments'. if none send zero
> Monthly Other Loan Payments (if any) --> send as 'other_loan_payments'. if none send zero
> Expected Monthly Household Expenses (food, grocery, insurance, tax, utilities, subscriptions, clothing and other)--> send as 'monthly_household_expenses'. if none send zero

Page 3: 
> Any prior credit defaults in last 5-years --> send as 'prior_defaults'
> Any bankruptcy in last 5-years --> send the number of bankruptcy's as 'prior_bankruptcy'
> Credit Score (freely available Borrowell/Mogo/Credit Karma or from your bank online account) --> send as 'creditscore'
> Total Number of Credit Lines including Credit Cards, Personal Loans, Credit Lines, Overdraft Protection, 
Mortgage and Post-paid Utilities (e.g., Hydro, Mobile, Internet etc) --> send as 'total_credit_lines'

HTTP API: http://ec2-3-142-218-97.us-east-2.compute.amazonaws.com/prequalification
HTTPS API: https://equ51lxyn2.execute-api.us-east-2.amazonaws.com/v1/postalcode
send post request with following parameters. For example:

Example: 
{"password" : "$2b$12$5BfAv3A4ia8wZAVyYpyivOfrEbCA88tc6RJJIDIcig00iTIMt/vwe", 
"postalcode" : "M4X0A1",
"province" : "ON",
"property_type": 1,
"property_price" : 1000000,
"downpayment" : 10000,
"sale_price" : 1000000,
"amortization" : 20,
"monthly_property_tax" : 75,
"monthly_heating_bill" : 50,
"rental_purpose" : "yes",
"coborrower" : "yes",
"self_employed" : "no",
"foreign_buyer" : "yes",
"job_tenure" : 11,
"monthly_salary" : 6893,
"monthly_other_income" : 500,
"monthly_household_expenses" : 1500,
"personal_loan_payments" : 0,
"monthly_car_payments" : 450,
"credit_card_Payments" : 500,
"other_loan_payments" : 500,
"gross_annual_income" : 12000,
"creditscore" : 772,
"total_credit_lines" : 10,
"prior_bankruptcy" : 0,
"year" : 1988,
"prior_defaults" : 0}
```