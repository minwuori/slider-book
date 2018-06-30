//console.log(json_text); //выводим как текст
var books = JSON.parse(json_text); //выводим распарсенный текст

// функция генерирует таблицу из полученных объектов, sourceData - массив с выбранными объектами
function showTable(sourceData){
	var resultAll = 0;
	var resultDiscount = 0;
	var resultUndiscounted = 0;

    $(".result").empty();
    $(` <tr>
			<th>Название</th>
			<th>Цена с учетом скидки</th>
		</tr>`).appendTo(".result");

	
	for (var i = 0; i < sourceData.length; i++) {
		//проверка на undefined, т.к. в массиве могут быть пустые элементы
		if (sourceData[i] != undefined){
			if (sourceData[i].typediscount === 'P'){
				var discount = +sourceData[i].price * sourceData[i].discount / 100;				
			} else if (sourceData[i].typediscount === 'F') { 
				discount = +sourceData[i].discount; 
			}
			resultDiscount = resultDiscount + discount;
			resultAll = resultAll + (+sourceData[i].price - discount);
			resultUndiscounted = resultUndiscounted + +sourceData[i].price;
			
				$(`	<tr>
					<td>` + sourceData[i].name + `</td>
					<td>`+ (Math.round((+sourceData[i].price - discount)*100)/100) +`
					</tr>`

				).appendTo(".result");
		}
	}
	
	$(` <tr>
			<th>Итог</th>
			<th>Всего `+ (Math.round(resultAll*100)/100) +` руб. </th>
		</tr>
		<tr>
			<th> </th>
			<th>Скидка `+ (Math.round(resultDiscount*100)/100) +` руб. </th>
		</tr>
		<tr>
			<th> </th>
			<th>Сумма без скидки `+ (Math.round(resultUndiscounted*100)/100) +` руб. </th>
		</tr>`).appendTo(".result");
}

$(function() {
	for (var i = 0; i < books.length; i++) {

		if (books[i].typediscount === "P") {
			var typeDiscount = ' %';
		} else if (books[i].typediscount === "F") {
			typeDiscount = ' руб.';
		};

		/*Дата-атрибут data-index нужен для того, чтобы при клике на карточку определить 
		соответствие объекту массива*/ 
		$(`<div class="book" data-index="` + i + `">
				<div class="book__picture">
					<img src="` + books[i].picture + `" alt="">
				</div>
				<div class="book__author">
					`+ books[i].author.last + ' ' + books[i].author.first + `
				</div>
				<div class="book__title">
					` + books[i].name + `
				</div>
				<div class="book__price">
					Цена: <span class="price"> ` + books[i].price +` </span> руб.
				</div>
				<div class="book__discount">
					Скидка: <span class="discount">`+ books[i].discount + `</span> `+ typeDiscount +`
				</div>
				<div class="book__buy">
					<a href="#">
						Купить
					</a>
				</div>
			</div>` 
		).appendTo(".slider");
	};

	var tableArr = [];
	$('.book').click(function() {
		var index = $(this).data('index');
		
		if ($(this).hasClass('book_selected')) {
			$(this).removeClass('book_selected');
			delete tableArr[index];
		} else {
			$(this).addClass('book_selected');
			tableArr[index] = books[index];
			
		}
		showTable(tableArr);
	});
});

