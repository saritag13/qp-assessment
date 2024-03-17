# qp-assessment
Grocery app apis with nodejs and typescript

Steps to tun the project
1. npm install -g typescript
2. cd qp-assessment
3. npm i
4. npm run dev

Queries to create Tables
1. CREATE TABLE categories(
	categoryId INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	categoryName VARCHAR(30) NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	description VARCHAR(100) NOT NULL
)

2. CREATE TABLE items(
    itemId INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    itemName VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	cost INT(20) NOT NULL,
	availability BOOLEAN,
	isEnabled BOOLEAN,
	quantity INT(20),
	unit VARCHAR(20),
	categoryId INT NOT NULL, FOREIGN KEY(categoryId) REFERENCES categories(categoryId)
)


3. CREATE TABLE users(
    userId INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    userName VARCHAR(20) NOT NULL,
    userType VARCHAR(20) NOT NULL,
    email VARCHAR(30) NOT NULL,
    password VARCHAR(255) NOT NULL,
	mobileNumber INT(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

4. CREATE TABLE addresses(
addressId INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
address VARCHAR(30) NOT NULL,
landMark VARCHAR(30) NOT NULL,
userId INT NOT NULL, FOREIGN KEY(userId) REFERENCES users(userId),
isPrimary BOOLEAN,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

5. CREATE TABLE orders(
    orderId VARCHAR(50) NOT NULL PRIMARY KEY,
    numberOfItems INT(20),
    totalCost INT(20),
    deliveryAddress VARCHAR(450),
    itemNames VARCHAR(250),
    orderStatus VARCHAR(100),
	paymentStatus VARCHAR(40),
    userId INT NOT NULL, FOREIGN KEY(userId) REFERENCES users(userId)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP
	
)

6. CREATE TABLE  orderred_items( 
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
 quantity INT(20), 
 unit VARCHAR(20), 
 cost INT(20), 
 itemId INT(11) NOT NULL,FOREIGN KEY(itemId) REFERENCES items(itemId), 
 orderId VARCHAR(50) NOT NULL,FOREIGN KEY(orderId) REFERENCES orders(orderId),
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
 updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

