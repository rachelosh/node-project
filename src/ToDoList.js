import "./ToDoList.css";
export default function ToDoList() {
    let time = new Date();
    let time1 = new Date('2023, 09, 07');
    let time2 = new Date('2023, 09, 08');
    let time3 = new Date('2023, 09, 09');
    let time4 = new Date('2023, 09, 10');

    //-------------מערך של אובייקטים המכיל פרטי משימות---------------
    let list = [
        { code: "1", name: "לנקות את הבית", long: " 40", date: time1.toLocaleDateString() },
        { code: "2", name: "לעשות שיעורי בית", long: "20", date: time2.toLocaleDateString() },
        { code: "3", name: "לערוך קניות", long: "70", date: time3.toLocaleDateString() },
        { code: "4", name: "להתאוורר", long: "12", date: time4.toLocaleDateString() }
    ];

    list.forEach((item) => {
        if (parseInt(item.long) > 60) {
            item.specialClass = "longTask";
        }
    });
    let tasksHeader;
    if (list.length >= 3) {
        console.log(list.length);
        tasksHeader = <h1 id="tasksHeader">אויש יש הרבה משימות תזדרז {list.length} במספרם </h1>;
    } else {
        tasksHeader = <h1 id="tasksHeader">כמות המשימות קטנה זה בסדר {list.length} במספרם </h1>;
    }

    return (
        <div className="tasks">
            {tasksHeader}
            <ul>
                {list.map((item, index) => <li key={item.code} className={parseInt(item.long) > 60 ? "longTask" : ""}>
                    <input type="button" className="btnTask" onClick={() => { t(item.name, item.date) }} />
                    <b>    משימה מספר   {index + 1}  </b>
                    {item.name} : <b>משך הזמן </b>  - {item.long} : <b>תאריך סיום</b> - {item.date}

                </li>
                )}
            </ul>
        </div>
    );



    function t(task, rest) {
        let d = rest - time.getDate();
        alert("המשימה הבאה " + task + " מספר הימים שנותרו " + (rest - time.getDate()))

    }

}