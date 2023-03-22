const SELECTED_COLOR = '#83FFFF';
		const UNSELECTED_BORDER_COLOR = 'transparent';
		const UNSELECTED_TEXT_COLOR = 'white';

		// initial hover behaivour
		let allItems = document.getElementsByName('item-checkbox');
		allItems.forEach((item) => {
			// these are the LI items
			item.addEventListener("mouseover", (e) => {changeOver(e.target) });
			item.addEventListener("mouseout", (e) => {changeOff(e.target) });
			item.addEventListener("click", (e) => {changeClick(e.target) });

			// this is the span item ( the children )
			let spanChildren = item.getElementsByTagName('span')[0];
			spanChildren.addEventListener("mouseover", (e) => {changeOver(e.target.parentNode) });
			spanChildren.addEventListener("mouseout", (e) => {changeOff(e.target.parentNode) });
			spanChildren.addEventListener("click", (e) => {changeClick(e.target.parentNode) });
		});

		function changeOver(target) {
			// prevent nasty things
			if (this === target) return;
			if (isTargetUnrecognized(target)) return;

			target.style.borderColor = SELECTED_COLOR;
			target.getElementsByTagName('span')[0].style.color = SELECTED_COLOR;

			event.stopPropagation();
		}

		function changeOff(target){
			// prevent nasty things
			if (this === target) return;
			if (isTargetUnrecognized(target)) return;

			// change the item only if isnt checked
			if (target.getElementsByTagName('input').length > 0 &&
				!target.getElementsByTagName('input')[0].checked) {
				target.style.borderColor = UNSELECTED_BORDER_COLOR;
				if (target.getElementsByTagName('span').length > 0)
					target.getElementsByTagName('span')[0].style.color = UNSELECTED_TEXT_COLOR;
			}
			
			event.stopPropagation();
		}

		function changeClick(target) {
			// prevent nasty things
			if(this === target) return;

			// get the checkbox for show or hide the element ( via css )
			let checkbox = target.getElementsByTagName('input')[0];

			var allCheckBoxes = document.getElementsByName('pagecheckbox');
			allCheckBoxes.forEach((item) => {
				if (item !== checkbox) {
					// dissable other checkboxes
					item.checked = false;
					changeOff(item.parentNode.parentNode);
				} else {
					// toggle the event one and decorate
					checkbox.checked = !checkbox.checked;
					if (checkbox.checked) changeOver(target); else changeOff(target);
				}
			});

			event.stopPropagation();
		}

		function isTargetUnrecognized(target) {
			// this can be tricky but we are only we only recognize events from: 
			// li because are our items
			// span because are the childs
			return (target.tagName !== 'LI' && 
			target.tagName !== 'SPAN')
		}