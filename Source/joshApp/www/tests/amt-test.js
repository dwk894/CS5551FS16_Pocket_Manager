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
		var func = $scope.recExpense(books, three, bookstore, 1/2/2016);

		// Amount check for a number in amount
		var amt = localStorage.getItem('rec.amount');
		expect(amt).toEqual(jasmine.any(Number));

		
		});
	});
});