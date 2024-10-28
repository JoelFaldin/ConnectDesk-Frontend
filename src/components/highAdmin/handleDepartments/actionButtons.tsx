import dataService from '../../../services/handleRequests'

// Component's interface:
interface actionButtons {
    toggleEdit: () => void,
    edit: boolean,
    id: string,
    rerender: () => void
}

const ActionButtons: React.FC<actionButtons> = ({ toggleEdit, edit, id, rerender }) => {
    // Function to delete a department:
    const handleDelete = async () => {
        if (confirm('Do you really want to remove this department?')) {
            try {
                const jwtToken = localStorage.getItem('jwt')
                await dataService.deleteDepartment(id, jwtToken)
            } catch(error: any) {
                alert(error.response.data.error)
            }
            rerender()
        }
    }
        
    return (
        <>
            <button
                className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10 mr-1 hover:bg-indigo-200"
                onClick={toggleEdit}
            >
                {edit
                    ? 'Cancel'
                    : 'Edit'
                }
            </button>
            <button
                className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10 mr-1 hover:bg-red-200"
                onClick={handleDelete}    
            >
                Remove department
            </button>
        </>
    )
}

export default ActionButtons