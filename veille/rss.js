$(document).ready(function() {
    var rssFeeds = {
        avis: 'https://cert.ssi.gouv.fr/avis/feed/',
        cti: 'https://www.cert.ssi.gouv.fr/cti/feed/'
    };

    function fetchRSS(feedUrl, tableId) {
        $.ajax({
            url: 'https://api.allorigins.win/get',
            method: 'GET',
            dataType: 'json',
            data: {
                url: feedUrl
            },
            success: function(data) {
                var parser = new DOMParser();
                var xmlDoc = parser.parseFromString(data.contents, "text/xml");
                var items = xmlDoc.getElementsByTagName("item");
                for (var i = 0; i < Math.min(items.length, 7); i++) { // Limite à 7 liens
                    var title = items[i].getElementsByTagName("title")[0].childNodes[0].nodeValue;
                    var link = items[i].getElementsByTagName("link")[0].childNodes[0].nodeValue;
                    var image = '<img src="https://www.ginjfo.com/wp-content/uploads/2017/05/ANSI.jpg" alt="Image par défaut" />';
                    var titleWithImage = '<a href="' + link + '">' + image + '<span>' + title + '</span></a>';
                    $('#' + tableId + ' tbody').append('<tr><td class="image-cell title-cell">' + titleWithImage + '</td></tr>');
                }
            },
            error: function(xhr, status, error) {
                console.error('Erreur AJAX: ' + error);
            }
        });
    }

    fetchRSS(rssFeeds.avis, 'feed-table-avis');
    fetchRSS(rssFeeds.cti, 'feed-table-cti');
});
