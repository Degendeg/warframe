$(document).ready(function() {
	
	$('.table-mods').hide();

    $('.thisYear').text((new Date()).getFullYear());

    function checkForMods(item) {
        return item.category === "Mods";
    }

    function populateTable(current) {
		$('.table-mods').show();
        $('.th-name').empty().prepend('<a href="http://warframe.wikia.com/wiki/' + current.name + '" target="_blank">' + current.name + '</a>');
        $('.th-description').text(current.description);
        $('.th-polarity').empty().prepend('<img src="../../img/polarity/' + current.polarity.toLowerCase() + '.png" alt="" />');
        $('.th-drain').text(current.baseDrain);
		$('.mod-image').empty().prepend('<img src="../../img/mods/' + current.name.toLowerCase().replace(/ /g,"_") + '.png" alt="" />');
        if (current.tradable) {
            $('.th-tradable').empty().prepend('<a href="https://warframe.market/items/' + current.name.toLowerCase().replace(/ /g,"_") + '" target="_blank"><span class="glyphicon glyphicon-ok-circle" aria-hidden="true"></span></a>');
        } else {
            $('.th-tradable').empty().prepend('<span class="glyphicon glyphicon-remove-circle" aria-hidden="true"></span>');
        }
    }
	
    function removeShit() {
		$('.table-mods').hide();
		$('.typeahead').val("");
        $('.th-name').empty();
        $('.th-description').text("");
        $('.th-polarity').empty();
        $('.th-drain').text("");
		$('.mod-image').empty();
		$('.th-tradable').empty();
    }
	
	$('#clearBtn').click(function () {
		removeShit();
	});

    $.get("/items", function(data) {
        var mods = data.filter(checkForMods);
        var $input = $(".typeahead");

        $input.typeahead({
            source: mods
        });

        $input.change(function() {
            var current = $input.typeahead("getActive");
            if (current) {
                if (current.name.toLowerCase() == $input.val().toLowerCase()) {
                    populateTable(current);
                } else {
                    populateTable(current);
                }
            } else {
                $('.result').text('No item was found, try again!');
            }
        });
    });
});