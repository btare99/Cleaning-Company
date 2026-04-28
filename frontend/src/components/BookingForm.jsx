import { useState } from 'react'
import '../styles/BookingForm.css'

export default function BookingForm() {

  const API_URL = '/api';
  console.log('API URL:', API_URL); 

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'home-cleaning',
    date: '',
    time: '',
    area: '',
    notes: ''
  })
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const services = [
    { value: 'home-cleaning', label: 'Home Cleaning' },
    { value: 'office-cleaning', label: 'Office Cleaning' },
    { value: 'deep-cleaning', label: 'Deep Cleaning' },
    { value: 'carpet-cleaning', label: 'Carpet Cleaning' }
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  console.log(import.meta.env.VITE_API_URL);

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrorMessage('')
    setSuccessMessage('')

    try {
      const response = await fetch(`${API_URL}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit booking')
      }

      setSuccessMessage('Booking request submitted! We will confirm shortly.')
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: 'home-cleaning',
        date: '',
        time: '',
        area: '',
        notes: ''
      })

      setTimeout(() => setSuccessMessage(''), 5000)
    } catch (error) {
      console.error('Error:', error)
      setErrorMessage(error.message || 'Failed to submit booking. Please try again.')
      setTimeout(() => setErrorMessage(''), 5000)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="booking-form-container">
      <h2>Rezervo tani</h2>
      <p className="booking-form-subtitle">Rezervo pastrimin në vetëm disa hapa</p>
      
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="name">Emri *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Emri juaj"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Emaili juaj"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Telefoni *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Numri i telefonit tuaj"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="service">Lloji i shërbimit *</label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
            >
              {services.map(s => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="date">Data *</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="time">Koha *</label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="area">Siperfaqja (m²) *</label>
            <input
              type="number"
              id="area"
              name="area"
              value={formData.area}
              onChange={handleChange}
              placeholder="Siperfaqja në m²"
              min="1"
              required
            />
          </div>
          <div className="form-group full-width">
            <label htmlFor="notes">Shënimet e Shtesë</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Cilësi të veçanta ose shënimet..."
            />
          </div>
        </div>
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Duke u dërguar...' : 'Rezervo'}
        </button>
        <p className="form-notice">Ne do t'konfirmojme rezervimin tuaj brenda 24 orësh</p>
      </form>

      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  )
}
