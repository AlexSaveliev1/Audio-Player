$(document).ready(function() {
    var jq = $.noConflict();
    var audio;
    jq("#pause").hide();

var child, s,count;
    count=0;
    s='s';

    // Show songs
    var songs=[{song:'Lifehouse - Broken.mp3',title:'Broken',artist:'Lifehouse'},{song:'Apparat-Goodbye.mp3',title:'Goodbye',artist:'Apparat'},
        {song:'ACDC – Thunderstruck.mp3',title:'Thunderstruck',artist:'AC/DC'},{song:'skryabin-starifotografii.mp3',title:'Stari fotografii',artist:'Srkybin'},
        {song:'alan walker-alone.mp3',title:'Alone', artist:'Alan Walker'}]
    function showSongs(){
        for (var i=0;i<songs.length;i++){
            var ext=s+count;
            child=document.createElement('LI');
            child.title=songs[i].title;
            child.className = ext;
            child.innerHTML=songs[i].song;
            jq("#playlist").append(child);
            jq("."+ext).attr('song',songs[i].song);
            jq("."+ext).attr('artist',songs[i].artist);
            count++;
        }
    }
    
    
    // Init Player
    showSongs();

    initPlayer(jq('#playlist li:first-child'));

    function initPlayer(element) {

        var song = element.attr('song')
        var title = element.attr('title');
        var artist = element.attr('artist')


        // Create audio object
        audio = new Audio('media/' + song)

        if (!audio.currentTime) {
            jq('#duration').html('0.00');
        }


        jq('#audio-player .title').text(title);
        jq('#audio-player .artist').text(artist);

        jq("#playlist li").removeClass("active")
        element.addClass('active')

    }

    // Play button
    jq("#play").click(function () {
        audio.play();
        jq("#play").hide();
        jq("#pause").show();
        jq("#duration").fadeIn(400)
        showDuration();
    })

    // Pause button
    jq("#pause").click(function () {
        jq("#pause").hide();
        jq("#play").show();
        audio.pause();
    })

    // Stop button
    jq("#stop").click(function () {
        audio.pause();
        audio.currentTime = 0;
        jq("#pause").hide();
        jq("#play").show();
        jq("#duration").fadeOut(400)
    })

    // Duration song
    function showDuration() {
        jq(audio).bind('timeupdate', function () {
            // Get hours and minutes
            var s = parseInt(audio.currentTime % 60); // sec on min
            var m = parseInt((audio.currentTime) / 60) % 60;
            // Add 10 if less then 10
            if (s < 10) {
                s = '0' + s;
            }
            jq('#duration').html(m + '.' + s);
            var value = 0;
            if (audio.currentTime > 0) {
                value = Math.floor((100 / audio.duration) * audio.currentTime)
            }
            jq('#progress').css('width', value + "%");
        })

    }

    // Switch to next
    jq('#next').click(function () {
        audio.pause();
        var next = jq('#playlist li.active').next();
        if (next.length == 0) {
            next = jq('#playlist li:first-child')
        }
        initPlayer(next);
        audio.play();
        showDuration();
    })

    // Switch to prev
    jq('#prev').click(function () {
        audio.pause();
        var prev = jq('#playlist li.active').prev();
        if (prev.length == 0) {
            prev = jq('#playlist li:last-child')
        }
        initPlayer(prev);
        audio.play();
        showDuration();
    })

    // Volume
    jq('#volume').change(function () {
        audio.volume = parseFloat(this.value / 10)
    })

    // Add song
/*    jq('#addSong').click(function () {
        var addSongName=document.getElementById('addSongName');
        var addSongTitle=document.getElementById('addSongTitle');
        var addSongArtist=document.getElementById('addSongArtist');

        if(addSongName.value=='' || addSongTitle.value=='' || addSongArtist.value==''){
            alert('Please, complete all fields!');
        }else{
            console.log(songs);
            var newSong={song:addSongName.value, title:addSongTitle.value,artist:addSongArtist.value};
            songs.push(newSong)
            console.log(songs);
            
        }
     })*/


})
