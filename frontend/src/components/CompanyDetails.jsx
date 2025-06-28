// src/pages/CompanyDetails.jsx
import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Briefcase, Mail, Calendar, Users } from "lucide-react";

export default function CompanyDetails() {
  const { user, SetSideBtns, jobs } = useAuth();

  useEffect(() => {
    SetSideBtns(3);
  }, [SetSideBtns]);

  return (
    <section className="max-w-4xl mx-auto mt-10 bg-white shadow-md rounded-2xl overflow-hidden">
      <div className="bg-blue-600 p-6 text-white flex items-center">
        <Briefcase size={28} className="mr-4" />
        <h2 className="text-3xl font-bold">Company Profile</h2>
      </div>

      <div className="p-8 space-y-6">
        <div className="text-center">
          <h3 className="text-4xl font-extrabold text-gray-800">{user.name}</h3>
        </div>

        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700">
          <div className="flex items-center">
            <Mail size={20} className="text-blue-500 mr-2" />
            <div>
              <dt className="font-semibold">Email Address</dt>
              <dd>{user.email}</dd>
            </div>
          </div>

          <div className="flex items-center">
            <Calendar size={20} className="text-green-500 mr-2" />
            <div>
              <dt className="font-semibold">Joined On</dt>
              <dd>
                {new Date(user.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "2-digit",
                })}
              </dd>
            </div>
          </div>

          <div className="flex items-center">
            <Users size={20} className="text-purple-500 mr-2" />
            <div>
              <dt className="font-semibold">Jobs Posted</dt>
              <dd>{jobs.length}</dd>
            </div>
          </div>
        </dl>
      </div>
    </section>
  );
}
