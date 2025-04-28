function Tasks(props) {
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Day</th>
                        <th>Breakfast</th>
                        <th>Lunch</th>
                        <th>Dinner</th>
                    </tr>
                </thead>
                <tbody>
                    {week.map(day => (
                    <tr key={day.name}>
                        <td>{day.name}</td>
                        <td>{day.meals.breakfast}</td>
                        <td>{day.meals.lunch}</td>
                        <td>{day.meals.dinner}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}