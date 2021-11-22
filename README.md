# Week8 - Ecom Full Stack - FE

This project is to implement React JS and Redux to create an E-commerce website called "GOODZ" with own API.

## Requirements:

- User are welcome with landing page
- User can see a list of products
- User can pagination through page
- User can filter the products list
- User can search for keywords
- User can click to see detail of one single product
- User can share search result and single product detail page URL to another user
- User can use url to go to different page
- User can create account
- User can login/logout
- User need authorization for some protected feature and layout
- Authorize User can create product cart
- User can add product to cart
- User can see product cart detail
- User can request to pay for a cart
- User can create review for a product
- User can see review of a product
- User can rate a product
- **Must** create at least 5 orders and 5 reviews

## File Structure

`|- weekly-project/

    |- src/
        |- redux/
            |- actions/
                |- auth.action.js
                |- user.action.js
                |- cart.action.js
                |- product.action.js
            |- constants/
                |- auth.constant.js
                |- user.constant.js
                |- cart.constant.js
                |- product.constant.js
            |- reducers/
                |- index.js
                |- auth.reducer.js
                |- user.reducer.js
                |- cart.reducer.js
                |- product.reducer.js
            |- store.js
        |- pages/
            |- LoginPage/
                |- LoginPage.js
                |- LoginPage.css
            |- ProfilePage/
                |- ProfilePage.js
                |- ProfilePage.css
            |- RegisterPage/
                |- RegisterPage.js
                |- RegisterPage.css
            |- HomePage/
                |- HomePage.js
                |- HomePage.css
            |- ProductPage/
                |- ProductPage.js
                |- ProductPage.css
            |- DetailPage/
                |- DetailPage.js
                |- DetailPage.css
            |- CartPage/
                |- CartPage.js
            |- NotFoundPage/
                |- NotFoundPage.js
                |- NotFoundPage.css
        |- components/
            |- PublicNavbar.js
            |- ProductPagination.js
            |- PublicFooter.js
        |- images/
            |- background.jpg
            |- avatar.jpeg`
