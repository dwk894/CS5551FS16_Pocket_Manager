describe('RecCtrl', function() {
	var $controller;
	
	beforeEach(angular.mock.module('starter'));
	beforeEach(angular.mock.inject(function(_$controller_) {
		$controller = _$controller_;
		
	}));
	describe('recExpense', function() {
	it("Checks for invalid amount", function () {
        $scope = {};
         controller = $controller('RecCtrl', {$scope: scope});
		
        // Test basic jasmine to make sure it is working
		var a = null;
		expect(a).toBeNull();

		// Expense function  
		var func = $scope.recExpense(null, null, null, null);

		// Category
		var cat = localStorage.getItem('rec.category');
		expect(cat).not.BeNull();

		// Amount
		var amt = localStorage.getItem('rec.amount');
		expect(amt).not.BeNull();

		// Vendor
		var ven = localStorage.getItem('rec.vendor');
		expect(ven).not.BeNull();

		// Date
		var ven = localStorage.getItem('rec.date');
		expect(date).not.BeNull();
		});
	});
});