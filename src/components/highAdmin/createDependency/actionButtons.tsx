import dataService from '../../../services/handleRequests'

interface actionButtons {
    toggleEdit: () => void,
    index: number,
    rerender: () => void
}

const ActionButtons: React.FC<actionButtons> = ({ toggleEdit, index, rerender }) => {
    const handleDelete = async () => {
        if (confirm('¿Quieres eliminar esta dependencia?')) {
            const jwtToken = localStorage.getItem('jwt')
            await dataService.deleteDependency(index, jwtToken)
            // Rerendering the list:
            rerender()
        }
    }
    
    return (
        <>
            <button
                className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10 mr-2 hover:bg-indigo-200"
                onClick={toggleEdit}
            >
                Editar
            </button>
            <button
                className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10 mr-2 hover:bg-red-200"
                onClick={handleDelete}    
            >
                Eliminar dependencia
            </button>
        </>
    )
}

export default ActionButtons