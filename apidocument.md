// page 1

List of  Featured Products (Get) http://localhost:9100/items/ftproducts

//Page2

Shop Page(Products)
List of Products (Get) http://localhost:9100/items/products
Filter on basis of (Gender for women use genderId:2 for men use genderId:4) (Get) http://localhost:9100/products?genderId=2
Filter on basis of type(for clothing use typeId:6 for accessories use typeId:8) (Get) http://localhost:9100/products?typeId=6
Filter on basis of both gender & type (Get)http://localhost:9100/products?genderId=4&typeId=6
Filter on basis of cost (>(Get)http://localhost:9100/filter/2?lcost=500&hcost=2000 
Sort on basis of cost(ascending) (Get)http://localhost:9100/filter/4?lcost=400&hcost=2000&
Sort on basis of cost(descending) (Get)http://localhost:9100/filter/4?lcost=400&hcost=2000&sort=-1

//Page3

Details Of The Product

Details of Product(Get) http://localhost:9100/details/3 


//page4

List of orders 
 
List of orders placed (Get) http://localhost:9100/orders

List of order placed of particular user (Get) http://localhost:9100/orders?email=romit@gmail.com


////////////////////////////////

Delete orders

(Delete) localhost:9100/deleteOrder/628c485d93399d546c136d84