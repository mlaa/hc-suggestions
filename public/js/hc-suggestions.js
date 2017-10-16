window.hc_suggestions  = {

	widget_container_class: 'hc-suggestions-widget',

	query_path: '/wp-json/hc-suggestions/v1/query?',

	/**
	 * Load results into target element via XHR.
	 *
	 * @param object                  $params object containing "s" & "post_type" keys to query
	 * @param jQuery element | string $target element into which to inject search results
	 */
	load_results: function( params, target ) {
		$.get( hc_suggestions.query_path + $.param( params ), function( data ) {
			var html = 'No results.';

			if ( data.results.length ) {
				html = '';

				$.each( data.results, function( i, result ) {
					html += '<li>' + result + '</li>';
				} );
			}
			target.html( html );
		} );
	},

	/**
	 * Initialize widget tab ui & load results for each tab
	 */
	init: function() {
		$( '.' + hc_suggestions.widget_container_class )
			.tabs()
			.find( 'div' ).each( function( i, el ) {
				hc_suggestions.load_results(
					{
						s: $( el ).attr( 'data-hc-suggestions-query' ),
						post_type: $( el ).attr( 'data-hc-suggestions-type' ),
					},
					$( el )
				);
			} );
	}
}
