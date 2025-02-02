
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Loader } from "../../Components";
import { getCvFromJobs, MeasureOffert } from '../Helpers';
import useAuthStore from '../../Store/authStore';

export const Applicantes = () => {
  const token = useAuthStore((state) => state.token);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all'); 
  const [expandedJob, setExpandedJob] = useState(null); 
  const [processingId, setProcessingId] = useState(null);

  const getCvs = async () => {
    setLoading(true);
    const response = await getCvFromJobs(token);
    if(response.ok) {
      setJobs(response.data);
    }
    setLoading(false);
  }

  const handleAccept = async (jobId, e) => {
    e.stopPropagation(); 
    setProcessingId(jobId);
    const response = await MeasureOffert(token, true, jobId);
    if(response.ok) getCvs();
    setProcessingId(null);
  }

  const handleReject = async (jobId, e) => {
    e.stopPropagation(); 
    setProcessingId(jobId);
    const response = await MeasureOffert(token, false, jobId);
    if(response.ok) getCvs();
    setProcessingId(null);
  }

  useEffect(() => {
    getCvs();
  }, [token]);

  if (loading) return <Loader />;

  const filteredJobs = jobs.filter(job => {
    if (activeTab === 'withApplicants') return job.oferta.length > 0;
    if (activeTab === 'noApplicants') return job.oferta.length === 0;
    return true;
  });

  return (
    <div className=" ml-32 min-h-screen bg-gradient-to-br  overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 mb-1"> Total Trabajos </p>
            <h3 className="text-3xl font-bold text-gray-900">{jobs.length}</h3>
            <div className="mt-2 text-xs text-green-600">
               Ofertas de trabajo
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 mb-1">Total Applicants</p>
            <h3 className="text-3xl font-bold text-gray-900">
              {jobs.reduce((acc, job) => acc + job.oferta.length, 0)}
            </h3>
            <div className="mt-2 text-xs text-blue-600">
              Todos los aplicantes
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 mb-1"> Promedio de aplicantes </p>
            <h3 className="text-3xl font-bold text-gray-900">
              {jobs.length ? (jobs.reduce((acc, job) => acc + job.oferta.length, 0) / jobs.length).toFixed(1) : 0}
            </h3>
            <div className="mt-2 text-xs text-purple-600">
              Promedio de aplicantes
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4 mb-8 overflow-x-auto pb-2">
          <button 
            onClick={() => setActiveTab('all')}
            className={`px-6 py-2 rounded-full whitespace-nowrap transition-all ${
              activeTab === 'all' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Todos los trabajos
          </button>
          <button 
            onClick={() => setActiveTab('withApplicants')}
            className={`px-6 py-2 rounded-full whitespace-nowrap transition-all ${
              activeTab === 'withApplicants' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Con Aplicantes
          </button>
          <button 
            onClick={() => setActiveTab('noApplicants')}
            className={`px-6 py-2 rounded-full whitespace-nowrap transition-all ${
              activeTab === 'noApplicants' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            No Aplicantes
          </button>
        </div>

        {/* Jobs Listing */}
        {filteredJobs.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-50 mb-4">
              <span className="text-2xl">🔍</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-500">Try adjusting your filters or post a new job</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <div 
                key={job.id} 
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 transition-all hover:shadow-md"
              >
                {/* Job Header - Clickable to expand */}
                <div 
                  onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                  className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <img
                        src={job.photo}
                        alt={job.title}
                        className="w-16 h-16 rounded-xl object-cover"
                      />
                      <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs font-medium px-2 py-1 rounded-full">
                        {job.oferta.length}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-lg font-semibold text-gray-900 mb-1">{job.title}</h2>
                      <p className="text-sm text-gray-500 line-clamp-1">{job.content}</p>
                    </div>
                    <svg 
                      className={`w-6 h-6 text-gray-400 transition-transform ${expandedJob === job.id ? 'rotate-180' : ''}`}
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Expandable Applicants Section */}
                {expandedJob === job.id && (
                  <div className="border-t border-gray-100">
                    {job.oferta.length === 0 ? (
                      <div className="p-6 text-center text-gray-500">
                        No applications yet
                      </div>
                    ) : (
                      <div className="divide-y divide-gray-100">
                        {job.oferta.map((applicant) => (
                          <div
                            key={applicant.id}
                            className="p-4 hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <img
                                  src={applicant.user.urlPhoto}
                                  alt={applicant.user.fullName}
                                  className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100"
                                />
                                <div>
                                  <Link 
                                    to={`/PerfilUsuario/${applicant.user.id}`}
                                    className="text-sm font-medium text-gray-900 hover:text-indigo-600"
                                  >
                                    {applicant.user.fullName}
                                  </Link>
                                  <p className="text-xs text-gray-500">{applicant.user.email}</p>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={(e) => handleAccept(applicant.id, e)}
                                  disabled={processingId === applicant.id}
                                  className="px-3 py-1.5 text-xs font-medium text-green-700 bg-green-50 
                                    rounded-lg hover:bg-green-100 transition-colors"
                                >
                                  Accept
                                </button>
                                <button
                                  onClick={(e) => handleReject(applicant.id, e)}
                                  disabled={processingId === applicant.id}
                                  className="px-3 py-1.5 text-xs font-medium text-red-700 bg-red-50 
                                    rounded-lg hover:bg-red-100 transition-colors"
                                >
                                  Reject
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};