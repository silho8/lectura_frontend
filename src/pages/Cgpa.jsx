import React, { useState, useEffect, useCallback } from 'react';
import Header from '../components/Header';
import cgpaService from '../services/cgpaService';
import FormInput from '../components/forms/FormInput';
import FormButton from '../components/forms/FormButton';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const CgpaPage = () => {
    const [semesters, setSemesters] = useState([]);
    const [selectedSemester, setSelectedSemester] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [newSemesterName, setNewSemesterName] = useState('');
    const [courseCode, setCourseCode] = useState('');
    const [courseTitle, setCourseTitle] = useState('');
    const [units, setUnits] = useState('');
    const [gradeRaw, setGradeRaw] = useState('');
    const [cumulativeGpa, setCumulativeGpa] = useState(null);

    const fetchSemesters = useCallback(async () => {
        setLoading(true);
        try {
            const data = await cgpaService.getSemesters();
            setSemesters(data.semesters);
            if (data.semesters.length > 0 && !selectedSemester) {
                setSelectedSemester(data.semesters[0]);
            }
        } catch (err) {
            setError('Failed to fetch semesters.');
        } finally {
            setLoading(false);
        }
    }, [selectedSemester]);

    const fetchCumulativeGpa = useCallback(async () => {
        try {
            const data = await cgpaService.calculateCumulativeCgpa();
            setCumulativeGpa(data);
        } catch (err) {
            console.error("Failed to fetch cumulative GPA");
        }
    }, []);


    useEffect(() => {
        fetchSemesters();
        fetchCumulativeGpa();
    }, [fetchSemesters, fetchCumulativeGpa]);

    const handleAddSemester = async (e) => {
        e.preventDefault();
        try {
            await cgpaService.createSemester(newSemesterName);
            setNewSemesterName('');
            fetchSemesters();
        } catch (err) {
            setError('Failed to add semester.');
        }
    };

    const handleAddCourse = async (e) => {
        e.preventDefault();
        if (!selectedSemester) {
            setError("Please select a semester first.");
            return;
        }
        try {
            await cgpaService.addCourse({
                semester_id: selectedSemester.id,
                course_code: courseCode,
                course_title: courseTitle,
                units: parseInt(units),
                grade_raw: gradeRaw
            });
            setCourseCode('');
            setCourseTitle('');
            setUnits('');
            setGradeRaw('');
            fetchSemesters();
            fetchCumulativeGpa();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add course.');
        }
    };

    const chartData = semesters.map(s => ({
        name: s.name,
        gpa: (s.courses.reduce((acc, c) => acc + (c.units * c.grade_point), 0) / s.courses.reduce((acc, c) => acc + c.units, 0) || 0).toFixed(2)
    }));

    return (
        <>
            <Header title="CGPA Calculator" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 space-y-8">
                    <div className="bg-pixel-white p-4 border-4 border-pixel-black">
                        <h3 className="text-2xl mb-4">Semesters</h3>
                        <ul className="space-y-2">
                            {semesters.map(s => (
                                <li key={s.id}>
                                    <button
                                        onClick={() => setSelectedSemester(s)}
                                        className={`w-full text-left px-4 py-2 font-mono text-lg ${selectedSemester?.id === s.id ? 'bg-pixel-blue text-pixel-white' : 'hover:bg-pixel-purple'}`}
                                    >
                                        {s.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                         <form onSubmit={handleAddSemester} className="mt-4 flex gap-2">
                            <FormInput id="newSemester" value={newSemesterName} onChange={e => setNewSemesterName(e.target.value)} placeholder="New semester..." />
                            <FormButton type="submit" fullWidth={false}>+</FormButton>
                        </form>
                    </div>

                    <div className="bg-pixel-white p-4 border-4 border-pixel-black">
                        <h3 className="text-2xl mb-4">Add New Course</h3>
                        <form onSubmit={handleAddCourse} className="space-y-4">
                            <FormInput id="courseCode" label="Course Code" value={courseCode} onChange={e=>setCourseCode(e.target.value)} required />
                            <FormInput id="courseTitle" label="Course Title" value={courseTitle} onChange={e=>setCourseTitle(e.target.value)} />
                            <FormInput id="units" label="Units" type="number" value={units} onChange={e=>setUnits(e.target.value)} required />
                            <FormInput id="gradeRaw" label="Grade (A, B, 4.5)" value={gradeRaw} onChange={e=>setGradeRaw(e.target.value)} required />
                            <FormButton isLoading={loading}>Add Course</FormButton>
                        </form>
                    </div>
                </div>

                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-pixel-white p-4 border-4 border-pixel-black">
                        <h3 className="text-2xl mb-4">{selectedSemester?.name || 'Select a Semester'}</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left font-mono text-lg">
                                <thead>
                                    <tr className="border-b-4 border-pixel-black">
                                        <th className="p-2">Code</th>
                                        <th className="p-2">Title</th>
                                        <th className="p-2">Units</th>
                                        <th className="p-2">Grade</th>
                                        <th className="p-2"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedSemester?.courses.map(c => (
                                        <tr key={c.id} className="border-b-2 border-pixel-purple">
                                            <td className="p-2">{c.course_code}</td>
                                            <td className="p-2">{c.course_title}</td>
                                            <td className="p-2">{c.units}</td>
                                            <td className="p-2">{c.grade_raw}</td>
                                            <td className="p-2"><button className="text-pixel-red text-2xl">🗑️</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {selectedSemester?.courses.length === 0 && <p className="text-center py-4">No courses added yet.</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                        <div className="bg-pixel-white p-6 border-4 border-pixel-black text-center">
                            <h4 className="text-xl">Semester GPA</h4>
                            <p className="text-5xl font-bold text-pixel-blue mt-2">
                                {(chartData.find(d => d.name === selectedSemester?.name)?.gpa) || '0.00'}
                            </p>
                        </div>
                         <div className="bg-pixel-green p-6 border-4 border-pixel-black text-center">
                            <h4 className="text-xl text-pixel-white">Cumulative GPA</h4>
                            <p className="text-5xl font-bold text-pixel-white mt-2">
                                {cumulativeGpa?.cumulativeGpa.toFixed(2) || '0.00'}
                            </p>
                        </div>
                    </div>

                    <div className="bg-pixel-white p-6 border-4 border-pixel-black">
                        <h3 className="text-2xl mb-4">GPA Progression</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis domain={[0, 5]} />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="gpa" stroke="#3D52A0" strokeWidth={4} activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
             {error && <div className="mt-4 text-center text-pixel-red">{error}</div>}
        </>
    );
};

export default CgpaPage;
