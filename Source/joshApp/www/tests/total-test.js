
describe('RecCtrl', function() {
	var $controller;
	
	beforeEach(angular.mock.module('starter'));
	beforeEach(angular.mock.inject(function(_$controller_) {
		$controller = _$controller_;
		
	}));
	
		
        // Test basic jasmine to make sure it is working
		var a = null;
		expect(a).toBeNull();

		// Expense function  
		

        var text = "THE MIXX\nHAWTHORNE\n913-338-4000\n11942 Roe Ave\nLeawood, KS 66209\nCheck Tab Cashier Time\nDate\n340849 3530 1111\n6:18:30 PM 1/2/2016\nSalad Wrap\n8.95\nHealthNut\n10.99\nFood Sub-Total\n19.94\nFountain Ice T\n2.20\nBeverage Sub-Total\n"
+ "2.20\n22.14\nSUB TOTAL\n2.18\nSales Tax\n24.32\nTOTAL\nReceipt Used: Master Card\nThank You!\nVisit Us at mixxingitup.com\nSend Feedback to info@mixxingitup.com\n";

         var totalBefore = text.match(/((.*\n){1})TOTAL/i);
                         
                            if(totalBefore != null){
                                totalSet[0] = totalBefore[0].match(regexFloat);
                                console.log(totalSet[0]);
                         
                            }
         // Get line after word Amount Paid
                            var amountAfter = text.match(/AMOUNT PAID((\n.*){1})/i);
                        
                           if(totalAfter != null){
                                totalSet[1] = amountAfter[0].match(regexFloat);
                                console.log(totalSet[1]);
                          
                            }

		// Amount check for a number in amount
		expect(total[1]).toEqual(24.32);

		
	
});