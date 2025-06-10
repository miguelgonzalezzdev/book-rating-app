import { useUsers } from "../hooks/useUsers";

export function UsersList() {
    const {
        users,
        isLoading,
        error
    } = useUsers()

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
                <thead>
                    <tr className="border-b border-neutral-400 dark:border-neutral-600 text-left">
                        <th className="py-3 px-4 text-sm font-semibold text-left">NOMBRE</th>
                        <th className="py-3 px-4 text-sm font-semibold text-left">EMAIL</th>
                        <th className="py-3 px-4 text-sm font-semibold text-left">SEGUIDORES</th>
                        <th className="py-3 px-4 text-sm font-semibold text-left">SIGUIENDO</th>
                        <th className="py-3 px-4 text-sm font-semibold text-left">PUBLICACIONES</th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading &&
                        <tr>
                            <td className="text-center text-neutral-700 dark:text-neutral-300" colSpan={5}>Cargando usuarios...</td>
                        </tr>
                    }

                    {error && !isLoading && users.length===0 &&
                        <tr>
                            <td className="text-center text-neutral-700 dark:text-neutral-300" colSpan={5}>Error al obtener los usuarios</td>
                        </tr>
                    }

                    {!error && !isLoading && users.length > 0 && users.map((user) => (
                        <tr key={user.id} className="border-b border-gray-300 dark:border-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition">
                            <td className="py-3 px-4 text-left">{user.name} {user.surname}</td>
                            <td className="py-3 px-4 text-left">{user.email}</td>
                            <td className="py-3 px-4 text-left">{user.followersCount}</td>
                            <td className="py-3 px-4 text-left">{user.followingCount}</td>
                            <td className="py-3 px-4 text-left">{user.postsCount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
