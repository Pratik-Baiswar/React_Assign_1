$(document).ready(function () {
  function liveRow(data) {
    $("#table-data").html("");
    for (i = 0; i < data.length; i++) {
      var table = $("<table>");
      var tbody = $("<tbody>");
      var dataRow = $("<tr>").addClass("data-row").attr("id", i);
      var column1 = $("<td>").addClass("column1").html(data[i].id);
      var column2 = $("<td>").addClass("column2").html(data[i].firstName);
      var column3 = $("<td>").addClass("column3").html(data[i].lastName);
      var column4 = $("<td>").addClass("column4").html(data[i].email);
      var column5 = $("<td>").addClass("column5").html(data[i].phone);

      dataRow.append(column1, column2, column3, column4, column5);
      tbody.append(dataRow);
      table.append(tbody);
      $("#table-data").append(table);

      $("#table-data").on("click", ".data-row", function () {
        $(".data-row").removeClass("active");
        $(this).addClass("active");
        $("#info-content div .user").html(
          data[$(this).attr("id")].firstName + " " + data[$(this).attr("id")].lastName
        );
        $("#info-content div textarea").html(data[$(this).attr("id")].description);
        $("#info-content div .addr").html(data[$(this).attr("id")].address.streetAddress);
        $("#info-content div .city").html(data[$(this).attr("id")].address.city);
        $("#info-content div .state").html(data[$(this).attr("id")].address.state);
        $("#info-content div .zip").html(data[$(this).attr("id")].address.zip);
      });
    }
  }
  $.get(
    "http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D",
    function (response) {
      liveRow(response);
      $("#search-box").on("keyup", function () {
        var value = $(this).val();
        var object = liveSearch(value, response);
        console.log(object);
        liveRow(object);
        console.log(liveRow(object));
      });
      function liveSearch(value, data) {
        var filterData = [];
        for (i = 0; i < data.length; i++) {
          value = value.toLowerCase();
          var userName = data[i].firstName.toLowerCase();
          if (userName.includes(value)) {
            filterData.push(data[i]);
          }
        }
        return filterData;
      }
    }
  );
});
