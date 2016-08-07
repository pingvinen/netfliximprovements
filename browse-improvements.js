(function(jQuery, undefined) {
	var hasBeenImproved = false;

	$('body').on('keydown', function(event) {
		if (event.keyCode == 81 && !hasBeenImproved) { // 81 = q
			hasBeenImproved = true;
			
			console.log('improving ui');
			
			showThatWeHaveImprovedTheUi();
			hideOriginals();
			moveMyListToTop();
			moveContinueWatchingToTop();
		}
	});
	
	/**
	 * Get a hashmap with the most common
	 * containers
	 */
	function getContainers() {
		var $mainView = jQuery('.mainView');
		var $lolomo = $mainView.find('.lolomo');
		
		return {
			  "$mainView": $mainView
			, "$lolomo": $lolomo
		};
	}
	
	function getSectionByType(type) {
		var $lolomo = getContainers().$lolomo;
		
		var $rowTitle = $lolomo.find('.rowTitle').filter('[type="'+type+'"]');
		
		return $rowTitle.parentsUntil('.lolomoRow.lolomoRow_title_card').parent();
	}
	
	/**
	 * Make a visible element in the ui that shows that the page
	 * has been improved
	 */
	function showThatWeHaveImprovedTheUi() {
		var $hdPinTarget = jQuery('#hdPinTarget');
		var $navigation = $hdPinTarget.find('ul[role="navigation"]');

		$navigation.append(
			jQuery('<li></li>').append('<a></a>').text('-- improved --')
		);
	}
	
	
	/**
	 * Hides the "Netflix originals" section
	 */
	function hideOriginals() {
		var $originals = getContainers().$lolomo.find('.originals-panels-row');
		$originals.hide();
	}

	/** 
	 * Move the "continue wathing" to the top 
	 */	
	function moveContinueWatchingToTop() {
		var $continueWatching = getSectionByType('continueWatching');
		
		getContainers().$mainView.prepend($continueWatching);
	}
	
	/** 
	 * Move the "my list" to the top 
	 */	
	function moveMyListToTop() {
		var $myList = getSectionByType('queue');
		
		getContainers().$mainView.prepend($myList);
	}
})(jQuery);
