import React from "react";

const UserCard = ({user}) => {
  console.log(user);
  return (
    <div className="card bg-base-300 w-96 shadow-xl">
      <figure>
        <img
          src={user?.photoUrl||"https://www.shutterstock.com/image-vector/avatar-gender-neutral-silhouette-vector-600nw-2526512481.jpg"}
          alt="Shoes"
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title font-bold text-2xl">{`${user?.firstName} ${user?.lastName} `} </h2>
        <p>{user?.about}</p>
        <div className="flex justify-start gap-2">
        <p>{user?.age}</p>
        <p>{user?.gender}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {user?.skills ? (
            Array.isArray(user?.skills) 
              ? user?.skills?.map((skill, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                    {skill}
                  </span>
                ))
              : typeof user.skills === 'string' 
                  ? user.skills.split(',').filter(skill => skill.trim()).map((skill, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                        {skill.trim()}
                      </span>   
                    ))
                  : 'Invalid skills format'
          ) : 'No skills added'}
        </div>

        <div className="card-actions justify-around">
          <button className="btn btn-primary rounded-xl">Ignore</button>
          <button className="btn btn-secondary rounded-xl">Interested</button>
        </div>
      </div>

    </div>
  );
};

export default UserCard;
