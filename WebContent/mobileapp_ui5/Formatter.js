jQuery.sap.declare("mobileapp_ui5.Formatter");

mobileapp_ui5.Formatter = {

  text :  function (sStatus) {
      if (sStatus === null) {
        return "nicht auf Tour";
      }  else {
        return sStatus;
      }
  },

status :  function (sStatus) {
    if (sStatus === null) {
      return "Error";
    } else {
      return "Success";
    }
}


};