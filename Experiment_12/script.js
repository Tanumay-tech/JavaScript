$(document).ready(function() {
    let tasks = JSON.parse(localStorage.getItem('sprintTasks')) || [];

    function saveAndRender() {
        localStorage.setItem('sprintTasks', JSON.stringify(tasks));
        const $list = $('#sprintList');
        $list.empty();

        tasks.forEach((task, index) => {
            const $li = $('<li>').toggleClass('completed', task.done);
            const $span = $('<span>').text(task.text).css('cursor', 'pointer').on('click', function() {
                tasks[index].done = !tasks[index].done;
                saveAndRender();
            });

            const $delBtn = $('<button>')
                .addClass('btn-danger')
                .text('Remove')
                .on('click', function() {
                    tasks.splice(index, 1);
                    saveAndRender();
                });

            $li.append($span, $delBtn);
            $list.append($li);
        });

        $('#taskStats').text(`Total Tasks: ${tasks.length}`);
    }

    $('#addSprintBtn').on('click', function() {
        const text = $('#sprintInput').val().trim();
        if (text !== '') {
            tasks.push({ text: text, done: false });
            $('#sprintInput').val('');
            saveAndRender();
        }
    });

    $('#fetchQuoteBtn').on('click', function() {
        $('#quoteText').text('Fetching live data...');
        $.getJSON('https://jsonplaceholder.typicode.com/posts/' + (Math.floor(Math.random() * 50) + 1))
            .done(function(data) {
                $('#quoteText').html(`<strong>${data.title}</strong><br>${data.body}`);
            })
            .fail(function() {
                $('#quoteText').text('Failed to load data from server.');
            });
    });

    saveAndRender();
});