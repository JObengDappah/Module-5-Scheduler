$(document).ready(function () {
  // Display the current day at the top of the calendar
  $("#currentDay").text(dayjs().format('dddd, MMMM D'));

  // Function to update the time blocks colors based on past, present, or future
  function updateTimeBlocks() {
    var currentHour = dayjs().hour();

    // Loop over time blocks
    $(".time-block").each(function () {
      var blockHour = parseInt($(this).attr("id").split("-")[1]);

      // Adjust blockHour for PM times
      if (blockHour < 9) {
        blockHour += 12;
      }

      // Add style classes based on comparison with the current hour
      if (blockHour < currentHour) {
        $(this).addClass("past").removeClass("present future");
      } else if (blockHour === currentHour) {
        $(this).addClass("present").removeClass("past future");
      } else {
        $(this).addClass("future").removeClass("past present");
      }
    });
  }

  // Call updateTimeBlocks on page load
  updateTimeBlocks();

  // Set interval to check every minute if time blocks need to be updated
  setInterval(updateTimeBlocks, 60000);

  // Function to load saved tasks from localStorage
  function loadTasks() {
    $(".time-block").each(function () {
      var id = $(this).attr("id");
      var task = localStorage.getItem(id);
      if (task) {
        $(this).find(".description").val(task);
      }
    });
  }

  // Call loadTasks on page load
  loadTasks();

  // Save button click listener
  $(".saveBtn").click(function () {
    var hourId = $(this).closest(".time-block").attr("id");
    var task = $(this).siblings(".description").val();
    localStorage.setItem(hourId, task);
  });
});
