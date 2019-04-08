function deleteComment(val) {
  $.ajax({
    type: "DELETE",
    url: "/delete/" + val,
    contentType: "application/json",
    success: function(response) {
      console.log(response);
      window.location.reload();
    }
  });
}
