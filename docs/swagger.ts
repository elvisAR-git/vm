import environment from "../app/config/environment"

const API_VERSION = environment.apiVersion
export const swaggerDocument: any = {
    "swagger": "2.0",
    "info": {
        "version": "1.0.1",
        "title": "Vending Machine API",
        "description": "Vending Machine API for Pariti task",
    },
    "host": "localhost:9090",
    "basePath": `/api/${API_VERSION}`,
    "schemes": [
        "http"
    ],
    "consumes": [
        "application/json"
    ],
    "produces": [
        "application/json"
    ],
    "paths": {
        "/user/products": {
            "get": {
                "tags": [
                    "User routes",
                ],
                "summary": "Get all products",
                "description": "This is a public API to fetch all products in the vending machine. It will return an array of products with slots. The slot is the index of the product in the array.",
                "operationId": "getProducts",
                "produces": [
                    "application/json"
                ],
                "responses": {
                    "200": {
                        "description": "successful operation",
                        "schema": {
                            "allOf": [
                                {
                                    "$ref": "#/definitions/Response"
                                },
                                {
                                    "properties": {
                                        "data": {
                                            "type": "array",
                                            "items": {
                                                "$ref": "#/definitions/Product",
                                            }
                                        },
                                        "message": {
                                            "type": "string",
                                            "example": "Products fetched successfully"
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        },
        "/user/buy/{slot}": {
            "post": {
                "tags": [
                    "User routes",
                ],
                "summary": "Buy product",
                "description": "Buy product",
                "operationId": "buyProduct",
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "slot",
                        "in": "path",
                        "description": "Slot number",
                        "required": true,
                        "type": "number",
                        "format": "int32",
                    }, {
                        "name": "body",
                        "in": "body",
                        "description": "buying data",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "bills": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/Money",
                                    }
                                },
                                "coins": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/Money",
                                    }
                                },
                                "qty": {
                                    "type": "number",
                                    "format": "int32",
                                    "example": 4
                                }
                            }
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "successful operation",
                        "schema": {
                            "allOf": [
                                {
                                    "$ref": "#/definitions/Response"
                                },
                                {
                                    "properties": {
                                        "data": {
                                            "$ref": "#/definitions/ChangeObject"
                                        },
                                        "message": {
                                            "type": "string",
                                            "example": "Product bought successfully"
                                        }
                                    }
                                }
                            ]
                        },
                    },
                    "500": {
                        "description": "Internal server error",
                        "schema": {
                            "allOf": [
                                {
                                    "$ref": "#/definitions/Response"
                                },
                                {
                                    "properties": {
                                        "message": {
                                            "type": "string",
                                            "example": "No product found in the slot",
                                        },
                                        "data": {
                                            "type": "object",
                                            "properties": {
                                                "error_message": {
                                                    "type": "string",
                                                    "example": "details of the error",
                                                }
                                            }
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        },

        "/admin/products": {
            "get": {
                "tags": [
                    "Admin routes",
                ],
                "summary": "Get all products",
                "description": "This is a clone of the public API to fetch all products in the vending machine.",
                "operationId": "getProducts",
                "produces": [
                    "application/json"
                ],
                "responses": {
                    "200": {
                        "description": "successful operation",
                        "schema": {
                            "allOf": [
                                {
                                    "$ref": "#/definitions/Response",
                                },
                                {
                                    "properties": {
                                        "data": {
                                            "type": "array",
                                            "items": {
                                                "$ref": "#/definitions/Product",
                                            }
                                        },
                                        "message": {
                                            "type": "string",
                                            "example": "Products fetched successfully"
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }

            },
            "post": {
                "tags": [
                    "Admin routes",
                ],
                "summary": "Add new product",
                "description": "Admins can use this API to add new products to the vending machine.",
                "operationId": "addProduct",
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "body",
                        "in": "body",
                        "description": "Product data",
                        "required": true,
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/Product",
                            }
                        }
                    }
                ]
            },
            "patch": {
                "tags": [
                    "Admin routes",
                ],
                "summary": "Update product",
                "description": "Admins can use this API to update products in the vending machine.",
                "operationId": "updateProduct",
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "slot",
                        "in": "path",
                        "description": "Slot number",
                        "required": true,
                        "type": "number",
                    },
                    {
                        "name": "body",
                        "in": "body",
                        "description": "Product data",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "$ref": "#/definitions/Product",
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "successful operation",
                        "schema": {
                            "allOf": [
                                {
                                    "$ref": "#/definitions/Response",
                                },
                                {
                                    "properties": {
                                        "data": {
                                            "$ref": "#/definitions/Product",
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        },
        "/admin/products/{slot}": {
            "get": {
                "tags": [
                    "Admin routes",
                ],
                "summary": "Get product by slot",
                "description": "Admins can use this API to get a product by slot number.",
                "operationId": "getProductBySlot",
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "slot",
                        "in": "path",
                    },
                ],
                "responses": {
                    "200": {
                        "description": "successful operation",
                        "schema": {
                            "allOf": [
                                {
                                    "$ref": "#/definitions/Response",
                                },
                                {
                                    "properties": {
                                        "data": {
                                            "$ref": "#/definitions/Product",
                                        },
                                        "message": {
                                            "type": "string",
                                            "example": "Product fetched successfully"
                                        }
                                    }
                                }
                            ]
                        }
                    },
                }
            },
            "delete": {
                "tags": [
                    "Admin routes",
                ],
                "summary": "Delete product by slot",
                "description": "Admins can use this API to delete a product by slot number.",
                "operationId": "deleteProductBySlot",
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "slot",
                        "in": "path",
                    },
                ],
                "responses": {
                    "200": {
                        "description": "successful operation",
                        "schema": {
                            "allOf": [
                                {
                                    "$ref": "#/definitions/Response",
                                },
                                {
                                    "properties": {
                                        "data": {
                                            "type": "number",
                                            "example": 1,
                                        },
                                        "message": {
                                            "type": "string",
                                            "example": "Product deleted successfully"
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        },
        "/admin/clearInventory": {
            "post": {
                "tags": [
                    "Admin routes",
                ],
                "summary": "Clear inventory",
                "description": "Admins can use this API to clear the inventory of the vending machine.",
                "operationId": "clearInventory",
                "produces": [
                    "application/json"
                ],
                "responses": {
                    "200": {
                        "description": "successful operation",
                        "schema": {
                            "allOf": [
                                {
                                    "$ref": "#/definitions/Response",
                                },
                                {
                                    "properties": {
                                        "data": {
                                            "type": "object",
                                            "example": {},
                                        },
                                        "message": {
                                            "type": "string",
                                            "example": "Inventory cleared successfully"
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        },
        // regiser routes
        "/admin/register/total": {
            "get": {
                "tags": [
                    "Admin routes",
                ],
                "summary": "Get total register",
                "description": "Admins can use this API to get the total register of the vending machine.",
                "operationId": "getTotalRegister",
                "produces": [
                    "application/json"
                ],
                "responses": {
                    "200": {
                        "description": "successful operation",
                        "schema": {
                            "allOf": [
                                {
                                    "$ref": "#/definitions/Response",
                                },
                                {
                                    "properties": {
                                        "data": {
                                            "type": "object",
                                            "properties": {
                                                "total": {
                                                    "type": "number",
                                                }
                                            }
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        },
        "/admin/register/cash": {
            "get": {
                "tags": [
                    "Admin routes",
                ],
                "summary": "Get cash register",
                "description": "Admins can use this API to get the cash register of the vending machine.",
                "operationId": "getCashRegister",
                "produces": [
                    "application/json"
                ],
                "responses": {
                    "200": {
                        "description": "successful operation",
                        "schema": {
                            "allOf": [
                                {
                                    "$ref": "#/definitions/Response",
                                },
                                {
                                    "properties": {
                                        "data": {
                                            "type": "object",
                                            "properties": {
                                                "total": {
                                                    "type": "number",
                                                    "example": 1600,
                                                },
                                                "coins": {
                                                    "type": "array",
                                                    "items": {
                                                        "$ref": "#/definitions/Money"
                                                    }
                                                },
                                                "bills": {
                                                    "type": "array",
                                                    "items": {
                                                        "$ref": "#/definitions/Money"
                                                    }
                                                }
                                            }
                                        },
                                        "message": {
                                            "type": "string",
                                            "example": "Cash fetched successfully"
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        },
        "/admin/register/addCash": {
            "post": {
                "tags": [
                    "Admin routes",
                ],
                "summary": "Add cash to register",
                "description": "Admins can use this API to add cash to the cash register of the vending machine.",
                "operationId": "addCashToRegister",
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "body",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "coins": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/Money"
                                    }
                                },
                                "bills": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/Money"
                                    }
                                }
                            }
                        }
                    }
                ],
                "responses": {
                    "201": {
                        "description": "successful operation",
                        "schema": {
                            "allOf": [
                                {
                                    "$ref": "#/definitions/Response",
                                },
                                {
                                    "properties": {
                                        "data": {
                                            "type": "object",
                                            "properties": {
                                                "total": {
                                                    "type": "number",
                                                    "example": 1600,
                                                }
                                            }
                                        },
                                        "message": {
                                            "type": "string",
                                            "example": "Cash added successfully"
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        },
        "/admin/register/removeCash": {
            "post": {
                "tags": [
                    "Admin routes",
                ],
                "summary": "Remove cash from register",
                "description": "Admins can use this API to remove cash from the cash register of the vending machine.",
                "operationId": "removeCashFromRegister",
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "body",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "money": {
                                    "$ref": "#/definitions/Money"
                                },
                                "type": {
                                    "type": "string",
                                    "enum": [
                                        "coin",
                                        "bill"
                                    ]
                                }
                            }
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "successful operation",
                        "schema": {
                            "allOf": [
                                {
                                    "$ref": "#/definitions/Response",
                                },
                                {
                                    "properties": {
                                        "data": {
                                            "type": "object",
                                            "properties": {
                                                "total": {
                                                    "type": "number",
                                                    "example": 1600,
                                                }
                                            }
                                        },
                                        "message": {
                                            "type": "string",
                                            "example": "Cash removed successfully"
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        },
        "/admin/register/withdraw": {
            "post": {
                "tags": [
                    "Admin routes",
                ],
                "summary": "Withdraw cash from register",
                "description": "Admins can use this API to withdraw cash from the cash register of the vending machine.",
                "operationId": "withdrawCashFromRegister",
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "body",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "amount": {
                                    "type": "number",
                                    "example": 100
                                }
                            }
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "successful operation",
                        "schema": {
                            "allOf": [
                                {
                                    "$ref": "#/definitions/Response",
                                },
                                {
                                    "properties": {
                                        "data": {
                                            "type": "array",
                                            "items": {
                                                "$ref": "#/definitions/Money"
                                            }
                                        },
                                        "message": {
                                            "type": "string",
                                            "example": "Cash withdrawn successfully"
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        },
        "/admin/register/drain": {
            "post": {
                "tags": [
                    "Admin routes",
                ],
                "summary": "Drain cash from register",
                "description": "Admins can use this API to drain cash from the cash register of the vending machine.",
                "operationId": "drainCashFromRegister",
                "produces": [
                    "application/json"
                ],
                "responses": {
                    "200": {
                        "description": "successful operation",
                        "schema": {
                            "allOf": [
                                {
                                    "$ref": "#/definitions/Response",
                                },
                                {
                                    "properties": {
                                        "data": {
                                            "type": "object",
                                            "example": {}
                                        },
                                        "message": {
                                            "type": "string",
                                            "example": "Cash drained successfully"
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        },
        "/admin/register/setMode": {
            "post": {
                "tags": [
                    "Admin routes",
                ],
                "summary": "Set register mode",
                "description": "Admins can use this API to set the mode of the cash register of the vending machine.",
                "operationId": "setRegisterMode",
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "body",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/Mode"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "successful operation",
                        "schema": {
                            "allOf": [
                                {
                                    "$ref": "#/definitions/Response",
                                },
                                {
                                    "properties": {
                                        "data": {
                                            "$ref": "#/definitions/Mode"
                                        },
                                        "message": {
                                            "type": "string",
                                            "example": "Mode set successfully"
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        },
        "/admin/register/getMode": {
            "get": {
                "tags": [
                    "Admin routes",
                ],
                "summary": "Get register mode",
                "description": "Admins can use this API to get the mode of the cash register of the vending machine.",
                "operationId": "getRegisterMode",
                "produces": [
                    "application/json"
                ],
                "responses": {
                    "200": {
                        "description": "successful operation",
                        "schema": {
                            "allOf": [
                                {
                                    "$ref": "#/definitions/Response",
                                },
                                {
                                    "properties": {
                                        "data": {
                                            "$ref": "#/definitions/Mode"
                                        },
                                        "message": {
                                            "type": "string",
                                            "example": "Mode retrieved successfully"
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        }
    },
    "definitions": {
        "Product": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "string",
                    "format": "uuid",
                    "description": "Product id",
                    "example": "d290f1ee-6c54-4b01-90e6-d701748f0851"
                },
                "name": {
                    "type": "string",
                    "description": "Product name",
                    "example": "Coca Cola"
                },
                "price": {
                    "type": "number",
                    "description": "Product price",
                    "example": 1.5
                },
                "qty": {
                    "type": "number",
                    "description": "Product quantity",
                    "example": 10
                },
                "type": {
                    "type": "string",
                    "description": "Product type",
                    "example": "drink"
                },
                "slot": {
                    "type": ["number", "null"],
                    "description": "Product slot",
                    "example": 1
                }
            }
        },
        "Money": {
            "type": "object",
            "properties": {
                "value": {
                    "type": "number",
                    "description": "Money value",
                    "example": 10
                },
                "count": {
                    "type": "number",
                    "description": "Money count",
                    "example": 23
                },
                "description": {
                    "type": "string",
                    "description": "Money description",
                    "example": "Ten Dollar Bill"
                }
            }
        },
        "ChangeObject": {
            type: "object",
            properties: {
                "product": {
                    "$ref": "#/definitions/Product"
                },
                "change": {
                    type: "object",
                    properties: {
                        "cash": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/Money"
                            }
                        },
                        "itemCost": {
                            "type": "number",
                            "description": "Product price",
                            "example": 1.5
                        },
                        "ammountPaid": {
                            "type": "number",
                            "description": "Ammount paid",
                            "example": 20
                        },
                        "changeDue": {
                            "type": "number",
                            "description": "Change due",
                            "example": 18.5
                        }
                    }
                }
            }
        },
        "Response": {
            "type": "object",
            "description": "Response object",
            "properties": {
                "status_code": {
                    "type": "number",
                    "description": "Status code",
                    "example": 200
                },
                "is_error": {
                    "type": "boolean",
                    "description": "Is error",
                    "example": false
                },
                "data": {
                    "type": "object",
                    "description": "Data object",
                },
                "message": {
                    "type": "string",
                    "description": "Message",
                }
            }
        },
        "Mode": {
            "type": "object",
            "description": "Denomination mode, e.g USD, EUR, etc",
            "properties": {
                "name": {
                    "type": "string",
                    "description": "Mode name",
                    "example": "default_US"
                },
                "coins": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/Money"
                    }
                },
                "bills": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/Money"
                    }
                }
            }

        }
    }


}