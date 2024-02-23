import React from 'react';
import { Button } from 'antd';
import { useMutation } from '@apollo/client';
import { DeleteOutlined } from '@ant-design/icons';
import { DELETE_PERSON, DELETE_CAR, GET_ALL_PEOPLE_WITH_CARS } from '../graphql/queries';

const DeleteButton = ({ itemId, isPerson }) => {
  const [deleteItem] = useMutation(isPerson ? DELETE_PERSON : DELETE_CAR, {
    update: (cache) => {
      try {
        const cachedData = cache.readQuery({
          query: GET_ALL_PEOPLE_WITH_CARS,
        });

        if (cachedData) {
          cache.writeQuery({
            query: GET_ALL_PEOPLE_WITH_CARS,
            data: {
              getAllPeople: isPerson
                ? cachedData.getAllPeople.filter((person) => person.id !== itemId)
                : cachedData.getAllPeople.map((person) => ({
                    ...person,
                    cars: person.cars.filter((car) => car.id !== itemId),
                  })),
            },
          });
        }
      } catch (error) {
        console.error('Error updating cache:', error);
      }
    },
  });

  const handleDelete = async () => {
    const confirmDelete = window.confirm(`Are you sure you want to delete this ${isPerson ? 'person' : 'car'}?`);

    if (confirmDelete) {
      try {
        await deleteItem({
          variables: {
            id: itemId,
          },
        });
      } catch (error) {
        console.error(`Error deleting ${isPerson ? 'person' : 'car'}`, error);
      }
    }
  };

  return (
    <Button type="text" style={{ color: 'red' }} onClick={handleDelete}>
      <DeleteOutlined />
    </Button>
  );
};

export default DeleteButton;
