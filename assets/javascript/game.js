
$(document).ready(function() {

//create general global game vcharbles 
	var characterHealth;
	var defendHealth;
	var playerAttack;
	var counterAttack;
	var heroAttack;
	var defendName = "";

	var characters = [
		{
			id: "first",
			name: "STAN",
			health: 110,
			atkPower: 20,
			ctrAtkPower: 13,
			pic: "http://icons.iconseeker.com/png/fullsize/south-park/stan.png"
		},

		{
			id: "second",
			name: "KENNY",
			health: 120,
			atkPower: 25,
			ctrAtkPower: 15,
			pic: "http://icons.iconseeker.com/png/fullsize/south-park/kenny.png"
		},
		{
			id: "third",
			name: "CARTMAN",
			health: 130,
			atkPower: 30,
			ctrAtkPower: 17,
			pic: "http://icons.veryicon.com/png/Movie%20%26%20TV/South%20Park/Cartman.png"	
		},

		{
			id: "fourth",
			name: "KYLE",
			health: 140,
			atkPower: 35,
			ctrAtkPower: 19,
			pic: "http://icons.iconarchive.com/icons/xtudiando/south-park/128/Kyle-icon.png"	
		},

	];

//function assigns progress bar to each character that keeps track of HP
//loop goes through all characters 
	function createCharacter() {
		for(var i=0; i<characters.length; i++) {
			var icon = $('<img>').addClass('characters ').attr({id: characters[i].name, src: characters[i].pic, "data-hlth": characters[i].health, "data-atk": characters[i].atkPower, "data-ctratk": characters[i].ctrAtkPower});
			var hlthpts = $('<div>').addClass('progress-bar progress-bar-success').attr({"role":'progressbar', "char-valuenow": '40', "char-valuemin": '0', "char-valuemax": characters[i].health, "style": 'width: 100%'}).text(characters[i].health);
			var divHlthpts = $('<div>').addClass('progress').append(hlthpts);
			var x = $('<p>').text(characters[i].name);
			x.addClass('name');
			var newDiv = $('<div>');
			newDiv.addClass('inline choice').append(icon).append(divHlthpts).append(x);	
			$('#choosePlayer').append(newDiv);
		};
	};
	createCharacter();

//function to assign your player and enemies to designated areas
	$('body').on('click', '.choice', function() {
		$(this).removeClass('choice').addClass('player');
		$(this).siblings().removeClass('choice  ').addClass('enemy').detach().appendTo('#enemies');
		$(this).detach().appendTo('#character');
		$('.character').removeClass('hide');
		$('.enemies').removeClass('hide');
		$('.defender').removeClass('hide');
		$('#select').addClass('hide');
		characterHealth = parseInt($('.player').children('.characters').attr('data-hlth'));
		playerAttack = parseInt($('.player').children('.characters').attr('data-atk'));
		heroAttack = playerAttack;
	});


	$('body').on('click', '.enemy', function() {
		$('.attack').removeClass('hide');
		if($.trim($("#defender").html())=='') {
			$('#damage').text('READY... ATTACK!');
			$(this).removeClass('enemy').addClass('defender');
			$(this).detach().appendTo('#defender');
			defendHealth = parseInt($('.defender').children('.characters').attr('data-hlth'));
			counterAttack = parseInt($('.defender').children('.characters').attr('data-ctratk'));
			defendName
	 = $('.defender').children('.characters').attr('id');
		}
	});

	$('body').on('click', '.strike', function() {
		if(characterHealth > 0 && $.trim($("#defender").html()) !='') {
			defMaxHlth = parseInt($('#defender').find('.progress-bar').attr('char-valuemax'));
			defendHealth = parseInt(defendHealth) - parseInt(heroAttack);
			playMaxHlth = parseInt($('.player').find('.progress-bar').attr('char-valuemax'));
			characterHealth = parseInt(characterHealth) - parseInt(counterAttack);
			$('.player').find('.progress-bar').text(characterHealth);
			$('.player').find('.progress-bar').css('width', characterHealth/playMaxHlth*100 + '%');
			$('.defender').find('.progress-bar').css('width', defendHealth/defMaxHlth*100 + '%');
			$('.defender').find('.progress-bar').text(defendHealth);
			$('#damage').text('You were counterattacked by ' + defendName
	 + ' for ' + counterAttack);
			$('#punch').text('You attack ' + defendName
	 + ' for ' + heroAttack);
			heroAttack += parseInt(playerAttack);
			if(characterHealth/playMaxHlth*100 < 50) {
				$('.player').find('.progress-bar').removeClass('progress-bar-success').addClass('progress-bar-warning');
			}
			if(characterHealth/playMaxHlth*100 < 20) {
				$('.player').find('.progress-bar').removeClass('progress-bar-warning').addClass('progress-bar-danger');
			}
			if(defendHealth/defMaxHlth*100 < 50) {
				$('.defender').find('.progress-bar').removeClass('progress-bar-success').addClass('progress-bar-warning');
			}
			if(defendHealth/defMaxHlth*100 < 20) {
				$('.defender').find('.progress-bar').removeClass('progress-bar-warning').addClass('progress-bar-danger');
			}
			if(defendHealth <= 0) {
				defendHealth = 0;
				$('.defender').find('.progress-bar').text(defendHealth);
				$('#damage').text('You defeated ' + defendName
			);
				$('#punch').text('');
				$('#defender').empty();
			}
			if(characterHealth <= 0) {
				characterHealth = 0;
				$('.player').find('.progress-bar').text(characterHealth);
				$('.player').empty();
				alert('You Lose');
				$('.reset').removeClass('hide');
			}
		}
		if($.trim($("#enemies").html())=='' && $.trim($("#defender").html()) =='' && $.trim($(".player").html()) != '') {
			alert('You Win');
			$('.reset').removeClass('hide');
		}
	});

//reset function that acts as a page refresh

	$('body').on('click', '.refresh', function() {
		$('#choosePlayer').empty();
		$('#damage').text('');
		$('#punch').text('');
		$('#character').empty();	
		$('#defender').empty();
		$('#enemies').empty();
		$('#select').removeClass('hide');
		$('.attack').addClass('hide');
		$('.character').addClass('hide');
		$('.enemies').addClass('hide');
		$('.defender').addClass('hide');
		$('.reset').addClass('hide');
		createCharacter
();
	});

});