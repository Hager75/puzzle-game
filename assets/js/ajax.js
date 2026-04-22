$(function (){

})

function storeScore(time)
{
	var data = {
		score : calculateScore(time),
		email : $('#email').val(),
		full_name : $('#fullname').val()
	}
	return $.ajax({
    url: "https://mypuzzle-game.netlify.app",
    type: "POST",
    cache: false,
    data: data,
  });
}

function getScores()
{
	return $.ajax({
    url: "https://mypuzzle-game.netlify.app/users",
    type: "GET",
    cache: false,
  });
}

function calculateScore(time)
{
	time = time.split(':')
	return  Math.max(500 - (+time[0] * 60 *60 + +time[1] * 60 + +time[2] ), 0 ) ;
}

function renderScoreLeaderBoard(users,currentUser)
{
	console.log(currentUser);
	$('#users-list').empty()
	users.forEach(function (user){
		var cloned = $('.user:first').clone().show()
		cloned.find('.username').text(user.full_name)
		cloned.find('.user-score').text(user.score)
		if(user.id == currentUser)
			cloned.addClass('active')
		console.log(cloned);
		$('#users-list').append(cloned)
	})

}
