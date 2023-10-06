$(function () {
    // Function to update the time-block classes based on the current hour
    function updateTimeBlocks() {
      const currentHour = dayjs().hour();
  
      $(".time-block").each(function () {
        const blockHour = parseInt($(this).attr("id").split("-")[1]);
  
        if (blockHour < currentHour) {
          $(this).removeClass("present future").addClass("past");
        } else if (blockHour === currentHour) {
          $(this).removeClass("past future").addClass("present");
        } else {
          $(this).removeClass("past present").addClass("future");
        }
      });
    }
  
    // Function to save user input in local storage
    function saveUserInput() {
      const blockId = $(this).parent().attr("id");
      const userInput = $(this).siblings(".description").val();
      localStorage.setItem(blockId, userInput);
    }
  
    // Function to load user input from local storage
    function loadUserInput() {
      $(".time-block").each(function () {
        const blockId = $(this).attr("id");
        const userInput = localStorage.getItem(blockId);
        if (userInput) {
          $(this).children(".description").val(userInput);
        }
      });
    }
  
    // Event listener for the save buttons
    $(".saveBtn").on("click", saveUserInput);
  
    // Display the current date in the header
    $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY"));
  
    // Update time-block classes and load user input
    updateTimeBlocks();
    loadUserInput();
  
    // Update time-block classes every minute
    setInterval(updateTimeBlocks, 60000);
  });
  