  $(document).ready(function() {
    // URL des flux RSS que vous avez collectés
    var rssFeeds = [
      'https://cert.ssi.gouv.fr/avis/feed/',
      // Ajoutez autant de flux RSS que nécessaire
    ];

    rssFeeds.forEach(function(feedUrl) {
      $.ajax({
        url: 'https://api.rss2json.com/v1/api.json',
        method: 'GET',
        dataType: 'json',
        data: {
          rss_url: feedUrl
        },
        success: function(data) {
          // Traitez les données du flux RSS ici et affichez-les dans le tableau
          data.items.forEach(function(item) {
            // Vérifiez si l'élément a une image
            var image = '<img src="https://www.ginjfo.com/wp-content/uploads/2017/05/ANSI.jpg" alt="Image par défaut" />';
            var titleWithImage = ' <a href="' + item.link + '">' + image + '<span>' + item.title + '</span></a>';
            $('#feed-table tbody').append('<tr><td class="image-cell title-cell">' + titleWithImage + '</td></tr>');
          });
        }
      });
    });
  });
