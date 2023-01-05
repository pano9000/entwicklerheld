export function getSortedShows(shows, times) {
  const sortedShows = times.map(time => {
      // get starttime, divide by 60 and floor it, to get the nearest full hour, and pad with "0" if necessary
      const startTimeHour = Math.floor(time.starttime / 60).toString().padStart(2, "0");
      // get Remainder of dividing starttime by 60, to get the minutes, and pad with "0" if necessary
      const startTimeMinute = (time.starttime % 60).toString().padStart(2, "0");

      // filter for the id in the shows, ids are unique, so there always will be only 1 item in the array, so just access that one by default
      const showDetails = shows.filter( show => time.id === show.id)[0];

      // create an object with a few extra helper properties - they get removed, before returning the sortedList
      const showObj = {
          "title": `<p class="title">${showDetails.title}</p>`, 
          "rawTitle": showDetails.title,
          "starttime": `${startTimeHour}:${startTimeMinute}`,
          "starttimeMinutes": time.starttime,
          "duration": showDetails.duration,
          "url": showDetails.url
      }

      return showObj;
  })
  
  // sort the shows "in place" by time
  sortedShows.sort( (first, second) => {
      if (first.starttime > second.starttime) {
          return 1;
      }
      if (first.starttime < second.starttime) {
          return -1;
      }
      if (first.starttime === second.starttime) {
          return 0;
      }
  });


  // Filter for "erroneous" shows in regards to schedulung
  const errorArray = sortedShows.filter( (show, index, arr) => {
      if (index === arr.length-1) {
          return false;
      }
      else {
          return ((show.starttimeMinutes + show.duration) > arr[index+1].starttimeMinutes)
      }
  })
  
  errorArray.forEach(error => {
      const currentIndex = sortedShows.indexOf(error);
      throw new Error(`${sortedShows[currentIndex].rawTitle}, ${sortedShows[currentIndex+1].rawTitle}`)
  })

  // Create new array with objects without the helper properties
  const returnShows = sortedShows.map( show => {
      delete show.duration;
      delete show.starttimeMinutes;
      delete show.rawTitle;
      return show;
  });
  
  return returnShows;
}

export function getProgress(width, duration, current) {
  // Calculate value
  let progressVal = Math.round(current / duration * width)

  //if the value is not a number (e.g. due to dividing by 0) -> set value to 0
  progressVal = (Number.isNaN(progressVal)) ? 0 : progressVal;

  // if value is bigger then the max width, use width as return value
  return (progressVal > width) ? width : progressVal;
}