$(document).ready( function(){
	$('form').on('submit', function(e){
		e.preventDefault();
		$(this).find('button[type=submit]').addClass('is-loading');
		var form = $('form')[0];
		setTimeout(function(){
			form.submit();
		}, 2000);
	});

	$('.icheck').iCheck({
		checkboxClass: 'icheckbox_square-green',
		radioClass: 'iradio_square-green',
		increaseArea: '20%' // optional
	});

});