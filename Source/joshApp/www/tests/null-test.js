describe('RecCtrl', function() {
	var scope;
	
	beforeEach(angular.mock.module('starter'));
	beforeEach(angular.mock.inject(function($rootScope, $controller) {
		scope = $rootScope.$new();
		$controller('RecCtrl', {$scope: scope});
	}));

	it("Checks for null values in expense submission", function () {

		// Test basic jasmine to make sure it is working
		var a = null;
		expect(a).toBeNull();

		// Expense function 
		func = scope.recExpense();

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