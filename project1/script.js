class CalendarEventPlanner {
    constructor() {
        this.events = [];
        this.currentDate = new Date();
        this.selectedDate = null;
        this.modal = document.getElementById('eventModal');
        this.form = document.getElementById('eventForm');
        this.eventsList = document.getElementById('eventsList');
        
        this.initializeCalendar();
        this.setupEventListeners();
        this.startCountdownTimer();
        this.loadEvents();
    }

    initializeCalendar() {
        document.getElementById('prevMonth').addEventListener('click', () => this.changeMonth(-1));
        document.getElementById('nextMonth').addEventListener('click', () => this.changeMonth(1));
        this.renderCalendar();
    }

    setupEventListeners() {
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
        
        document.querySelector('.close-button').addEventListener('click', () => {
            this.modal.classList.remove('show');
        });

        window.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.modal.classList.remove('show');
            }
        });
    }

    loadEvents() {
        const savedEvents = localStorage.getItem('events');
        if (savedEvents) {
            this.events = JSON.parse(savedEvents);
            this.renderEvents();
            this.renderCalendar();
        }
    }

    saveEvents() {
        localStorage.setItem('events', JSON.stringify(this.events));
    }

    changeMonth(delta) {
        this.currentDate.setMonth(this.currentDate.getMonth() + delta);
        this.renderCalendar();
    }

    renderCalendar() {
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
        
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                          'July', 'August', 'September', 'October', 'November', 'December'];
        document.getElementById('currentMonth').textContent = `${monthNames[month]} ${year}`;

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const totalDays = lastDay.getDate();
        const startingDay = firstDay.getDay();

        const prevMonthLastDay = new Date(year, month, 0).getDate();
        const prevMonthDays = Array.from({ length: startingDay }, (_, i) => ({
            day: prevMonthLastDay - startingDay + i + 1,
            isCurrentMonth: false,
            date: new Date(year, month - 1, prevMonthLastDay - startingDay + i + 1)
        }));

        const currentMonthDays = Array.from({ length: totalDays }, (_, i) => ({
            day: i + 1,
            isCurrentMonth: true,
            date: new Date(year, month, i + 1)
        }));

        const remainingDays = 42 - (prevMonthDays.length + currentMonthDays.length);
        const nextMonthDays = Array.from({ length: remainingDays }, (_, i) => ({
            day: i + 1,
            isCurrentMonth: false,
            date: new Date(year, month + 1, i + 1)
        }));

        const allDays = [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];

        const calendarDays = document.getElementById('calendarDays');
        calendarDays.innerHTML = allDays.map(({ day, isCurrentMonth, date }) => {
            const isToday = this.isSameDay(date, new Date());
            const isSelected = this.selectedDate && this.isSameDay(date, this.selectedDate);
            const hasEvents = this.events.some(event => this.isSameDay(new Date(event.date), date));
            
            const classes = [
                'day',
                isCurrentMonth ? '' : 'other-month',
                isToday ? 'today' : '',
                isSelected ? 'selected' : '',
                hasEvents ? 'has-events' : ''
            ].filter(Boolean).join(' ');

            return `
                <div class="${classes}" data-date="${date.toISOString()}" onclick="eventPlanner.selectDate('${date.toISOString()}')">
                    ${day}
                </div>
            `;
        }).join('');
    }

    selectDate(dateString) {
        const date = new Date(dateString);
        this.selectedDate = date;
        this.renderCalendar();
        this.modal.classList.add('show');
    }

    isSameDay(date1, date2) {
        return date1.getFullYear() === date2.getFullYear() &&
               date1.getMonth() === date2.getMonth() &&
               date1.getDate() === date2.getDate();
    }

    handleSubmit(e) {
        e.preventDefault();
        
        if (!this.selectedDate) return;

        const title = document.getElementById('title').value;
        const time = document.getElementById('time').value;
        const description = document.getElementById('description').value;

        if (!title || !time) return;

        const newEvent = {
            id: crypto.randomUUID(),
            title,
            date: this.selectedDate.toISOString().split('T')[0],
            time,
            description
        };

        this.events.push(newEvent);
        this.saveEvents();
        this.renderEvents();
        this.renderCalendar();
        this.form.reset();
        this.modal.classList.remove('show');
    }

    deleteEvent(id) {
        this.events = this.events.filter(event => event.id !== id);
        this.saveEvents();
        this.renderEvents();
        this.renderCalendar();
    }

    calculateCountdown(date, time) {
        const eventDate = new Date(`${date}T${time}`);
        const now = new Date();
        const diff = eventDate.getTime() - now.getTime();

        if (diff > 0) {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            return `${days}d ${hours}h ${minutes}m`;
        }
        return 'Event passed';
    }

    startCountdownTimer() {
        setInterval(() => {
            const countdowns = document.querySelectorAll('.countdown p');
            countdowns.forEach(countdown => {
                const id = countdown.dataset.id;
                const event = this.events.find(e => e.id === id);
                if (event) {
                    countdown.textContent = `Time remaining: ${this.calculateCountdown(event.date, event.time)}`;
                }
            });
        }, 1000);
    }

    renderEvents() {
        const sortedEvents = [...this.events].sort((a, b) => {
            const dateA = new Date(`${a.date}T${a.time}`);
            const dateB = new Date(`${b.date}T${b.time}`);
            return dateA - dateB;
        });

        this.eventsList.innerHTML = sortedEvents.map(event => `
            <div class="event-card">
                <div class="event-header">
                    <h3 class="event-title">${event.title}</h3>
                    <button onclick="eventPlanner.deleteEvent('${event.id}')" class="delete-button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                    </button>
                </div>
                <p class="event-description">${event.description}</p>
                <div class="event-datetime">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                    <span>${new Date(event.date).toLocaleDateString()}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    <span>${event.time}</span>
                </div>
                <div class="countdown">
                    <p data-id="${event.id}">Time remaining: ${this.calculateCountdown(event.date, event.time)}</p>
                </div>
            </div>
        `).join('');
    }
}

const eventPlanner = new CalendarEventPlanner();