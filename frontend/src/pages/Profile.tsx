import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { setUser } from '../redux/slices/userSlice';
import useAuth from '../hooks/useAuth';
import { updateUserProfile } from '../services/userService'; 

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useAuth(); // Dados do usuário autenticado
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });
  const [isEditing, setIsEditing] = useState(false); // Estado de edição
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const userName = useSelector((state: RootState) => state.user.name);

  useEffect(() => {
    if (user) {
      setFormData({ name: userName, email: user.email });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const updatedUser = await updateUserProfile(user.id ?? '', formData); // Chamada à API
      dispatch(setUser(updatedUser)); // Atualiza Redux com os dados atualizados
      setIsEditing(false); // Sai do modo de edição
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      setError('Não foi possível atualizar o perfil. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold text-center mb-4">Perfil</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-medium">
            Nome
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            disabled={!isEditing}
            className={`mt-1 p-2 w-full border rounded ${
              isEditing ? 'border-gray-300' : 'bg-gray-100 cursor-not-allowed'
            }`}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            disabled={!isEditing}
            className={`mt-1 p-2 w-full border rounded ${
              isEditing ? 'border-gray-300' : 'bg-gray-100 cursor-not-allowed'
            }`}
          />
        </div>

        {isEditing ? (
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              disabled={isLoading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
          >
            Editar Perfil
          </button>
        )}
      </form>
    </div>
  );
};

export default Profile;
