(function(){
	$.get( "https://www.googleapis.com/books/v1/volumes?q=+subject:fiction&maxResults=36", function( data ) {
		$( ".result" ).html( data );
		var itemsArr = [];
		var c = 0;

		for (var i in data.items){
			var item = data.items[i];

			if(c==4){
				c=0;
				var row = buildRow(itemsArr);
				itemsArr = [];
				$('#books').append(row);

			}
			var obj = {};
			obj.title = item.volumeInfo.title;
			obj.thumb = item.volumeInfo.imageLinks.thumbnail;
			itemsArr.push(obj);
			c++;
		}


	});

	var buildRow = function(data){
		var row = '<div class="row">'+
		'<div class="col-md-3"><img alt="'+data[0].title+'" data-toggle="modal" data-target="#myModal" class="imgcls" src="'+data[0].thumb+'"></br><h3><span class="label label-default">'+data[0].title+'</span></h3></div>' +
		'<div class="col-md-3"><img alt="'+data[1].title+'" data-toggle="modal" data-target="#myModal" class="imgcls" src="'+data[1].thumb+'"></br><h3><span class="label label-default">'+data[1].title+'</span></h3></div>' +
		'<div class="col-md-3"><img alt="'+data[2].title+'" data-toggle="modal" data-target="#myModal" class="imgcls" src="'+data[2].thumb+'"></br><h3><span class="label label-default">'+data[2].title+'</span></h3></div>' +
		'<div class="col-md-3"><img alt="'+data[3].title+'" data-toggle="modal" data-target="#myModal" class="imgcls" src="'+data[3].thumb+'"></br><h3><span class="label label-default">'+data[3].title+'</span></h3></div>' +
		'</div><br/>';
		return row;
	};


	$('#myModal').on('show.bs.modal', function (e) {
		///order/epid/{epid}/did/{did}/book/{bookid}/q/{quantity}
		$('#bookimg').attr('src', e.relatedTarget.src);
		$('#myModalLabel').text(e.relatedTarget.alt);
	});

	$('#myModal').on('shown.bs.modal', function (e) {
		$('#makeOrder').click(function(e){
			$.get( "server/server.jag", {'quantity':$('.form-control').val()}, function( data ) {

				if(data.data.data.approval != undefined){
					var lblerr = '<div class="alert alert-danger">Quantity exceeds the limit</div>';
					$('#msg').text('');
					$('#msg').append(lblerr);
				}

				if(data.data.data.response != undefined){
					var lblsuc = '<div class="alert alert-success">'+data.data.data.response+'</div>';
					$('#msg').text('');
					$('#msg').append(lblsuc);
				}



				console.log(data);
			},"json");
		});
	});

	







})();