
import { useAppSelector } from "../store/store";

const List = () => {
    const persons = useAppSelector((state) => state.person.persons);

    return (<div>
        <table>
            <thead>
                <tr>
                    <th>username</th>
                    <th>email</th>
                </tr>
            </thead>
            <tbody>
                {persons.map((p) => {
                    return (
                        <tr key={p._id}>
                            <th>{p.username}</th>
                            <th>{p.email}</th>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>)
}

export default List;