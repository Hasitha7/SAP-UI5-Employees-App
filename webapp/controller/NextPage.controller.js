sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel"
    ], function (Controller, UIComponent, JSONModel) {
        "use strict";

        return Controller.extend("myproject.controller.NextPage", {
            onInit: function () {
                // Assuming "EmployeeData" is the name of your model
                this.getView().setModel(this.getOwnerComponent().getModel("EmployeeData"));
                this.getRouter().getRoute("NextPage").attachPatternMatched(this._handleRouteMatched, this);
            },
    
            getRouter: function () {
                return UIComponent.getRouterFor(this);
            },
    
            _handleRouteMatched: function (oEvent) {
                var EmpNo = oEvent.getParameter("arguments").EmpNo;
                var oModel = this.getOwnerComponent().getModel("EmployeeData");
    
                // Find the employee with the matching EmpNo
                var oEmployee = oModel.getProperty("/EmployeeList").find(function (employee) {
                    return employee.EmpNo === EmpNo;
                });
    
                // Now you can access all data related to EmpNo
                if (oEmployee) {
                    console.log("Employee Data:", oEmployee);
    
                    // Set the binding context of the form to the selected employee data
                    this.getView().byId("form3").setBindingContext(
                        new sap.ui.model.Context(oModel, "/EmployeeList/" + oModel.getProperty("/EmployeeList").indexOf(oEmployee))
                    );
                    this.getView().byId("form2").setBindingContext(
                        new sap.ui.model.Context(oModel, "/EmployeeList/" + oModel.getProperty("/EmployeeList").indexOf(oEmployee))
                    );
                    this.getView().byId("form6").setBindingContext(
                        new sap.ui.model.Context(oModel, "/EmployeeList/" + oModel.getProperty("/EmployeeList").indexOf(oEmployee))
                    );
                    this.getView().byId("table0").setBindingContext(
                        new sap.ui.model.Context(oModel, "/EmployeeList/" + oModel.getProperty("/EmployeeList").indexOf(oEmployee))
                    );
    
                    console.log(oEmployee.EmpName)
                }
            },
    
            onNavBack: function () {
                history.go(-1);
            },
        });
    });