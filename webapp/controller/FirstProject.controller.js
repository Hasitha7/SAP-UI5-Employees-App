sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, UIComponent) {
        "use strict";

        return Controller.extend("myproject.controller.FirstProject", {
            onInit: function () {
                var that = this;
                let oModel = that.getOwnerComponent().getModel("AirLineServiceModel");
                this.readAirlineDetails("/ScarrSet", oModel).then(function(oData){
                    console.log(oData);

                    let airLineDetailModel = that.getOwnerComponent().getModel("airLineDetails"),
                        airLineData = {};
                    airLineData.airLineList = oData.results;
                    airLineDetailModel.setData(airLineData);
                    airLineDetailModel.updateBindings();
                    that.getview().setModel(airLineDetailModel, "airLineDetailModdel");
                },function(oError){
                    
                })

            },
            readAirlineDetails: function(sUrl, oDatamodel){
                var deferred = jQuery.Deferred();
                var that = this;
                that.deferred = deferred;

                oDatamodel.read(sUrl, {
                    success: function (oData, response){
                        that.deferred.resolve(oData);
                    },
                    error: function (oError, response){
                        that.deferred.reject(oError);
                    }
                });
                return deferred.promise();
            },
            onItemPress: function(oEvent){
                  var Val=this.getView().byId("one").getSelectedItem();
                  console.log(Val);
                  var emp=Val.getBindingContext("EmployeeData").getObject();
                  console.log(emp);
                  console.log(emp.EmpNo);
  
                  this.getRouter().navTo("NextPage",{
                          EmpNo : emp.EmpNo
                        });         
            },
              
            onPress:function(){this.getRouter().navTo("NextPage")},   
            getRouter: function(){
                return UIComponent.getRouterFor(this);
            },
            onCreate:function(){
               this.getView().byId("onDialogCreate").setVisible(true).open(); 
            },
            onCancel:function(){
                this.getView().byId("onDialogCreate").setVisible(true).close(); 
             }
        });
    });
