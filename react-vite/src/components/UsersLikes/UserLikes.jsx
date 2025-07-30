import React, { useEffect, useState } from 'react';

const UserLikes = ({ userId }) => {
    const [likedWorkouts, setLikedWorkouts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserLikes = async () => {
            try {
                const response = await fetch(`/api/users/${userId}/likes`);
                if (!response.ok) {
                    throw new Error('Failed to fetch user likes');
                }
                const data = await response.json();
                setLikedWorkouts(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchUserLikes();
    }, [userId]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>User Likes</h2>
            {likedWorkouts.length > 0 ? (
                <ul>
                    {likedWorkouts.map(workout => (
                        <li key={workout.id}>
                            {workout.name} - {workout.description}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No liked workouts found.</p>
            )}
        </div>
    )

}

export default UserLikes;
