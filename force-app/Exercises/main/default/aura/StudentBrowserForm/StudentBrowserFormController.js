({
	doInit: function (component, event, helper) {
		helper.onInit(component, event, helper);
	},
	onDeliveryChange: function (component, event, helper) {
		helper.onFilterChange(component);
	},
	onAddNewDelivery: function (component, event, helper) {
		var evt = $A.get('event.force:createRecord');
		if (evt) {
			evt.setParams({
				entityApiName: 'Course_Delivery__c',
				defaultFieldValues: {
					Instructor__c: component.get('v.selectedInstructorId')
				}
			});
			evt.fire();
		} else {
			alert("Feature not available");
		}
	},
	onInstructorChange: function (component, event, helper) {
		component.set('v.selectedDeliveryId', '');
		if (component.get('v.selectedInstructorId') != '') {
			helper.callServer(
				component,
				"c.getDeliveriesByInstructor",
				function (response) {
					component.set('v.deliveries', response);
				},
				{
					instructorId:
						component.get('v.selectedInstructorId')
				}
			);
			helper.onFilterChange(component);
		}
	}
})
