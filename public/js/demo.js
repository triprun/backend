
$(document).ready(()	=>	{
	
	print_log = (text, style) => {
		log = $('.demo_log');
		html = '<div class="alert '+style+'">'+text+'</div>';
		log.append(html);
		log.animate({ scrollTop: 99999999999999999 }, 1);
	}
	
	$('form').on('submit', function() {
		
		data = $(this).serializeArray();
		console.log(data);
		
		/* форма с токенами */
		if ( $(this).find('[name="method_"]').val() == 'custom_tokens' ) {
			
			if ( $(this).find('[name="object_method_"]').val() == 'custom_update' ) {
				data_ = {};
				data_.access_token = $(this).find('[name="access_token"]').val();
				data_.refresh_token = $(this).find('[name="refresh_token"]').val();
				$.ajax({
					url:	'/demo/update',
					method: 'post',
					data: data_,
					success: (e) => {
					},
				});
			}
			
			if ( $(this).find('[name="object_method_"]').val() == 'custom_clear' ) {				
				$('[name="access_token"]').val('');
				$('[name="refresh_token"]').val('');
				$.ajax({
					url:	'/demo/clear',
					method: 'post',
					success: (e) => {
					},
				});
			}
			
			if ( $(this).find('[name="object_method_"]').val() == 'custom_to_all' ) {		
				$('[name="access_token"]').val($('[name="access_token"]').val());
				$('[name="refresh_token"]').val($('[name="refresh_token"]').val()); 
			}
			
			return false;
		}
		
		
		text = '';
		method_ = '';
		object_method_ = '';
		data_ = {};
		
		$.each(data, (i, e) => {
			if ( e.name == 'method_' ) {
				text += '<b>'+e.value + '</b> ';
				method_ = e.value;
			} else 
			if ( e.name == 'object_method_' ) {
				text += '<b>'+e.value + '</b><br>';
				object_method_ = e.value;
			} else {
				if (  e.value != '' ) {
					data_[e.name] = e.value.trim();
				}
			}
		});
		
		text += '<b>Params:</b><br><pre>'+JSON.stringify(data_, undefined, 2)+'</pre>';
		print_log(text, 'alert-info');
		
		$.ajax({
			url:	'/api'+object_method_,
			method: method_,
			data: data_,
			success: (e) => {				
				text = '<b>Res:</b><br><pre>'+JSON.stringify(e, undefined, 2)+'</pre>';
				print_log(text, 'alert-success');
				if ( object_method_ == '/user/login' ) {
					$('#access_token__').val(e.response.access_token);
					$('#refresh_token__').val(e.response.refresh_token);
					$('#save_token__').trigger('click');
				}
			},
			error: (q , e) => {
				text = '<b>Error:</b><br><pre>'+JSON.stringify(q.responseJSON, undefined, 2)+'</pre>';
				print_log(text, 'alert-danger');
			}
		});
		
		return false;
	});
	
	
});