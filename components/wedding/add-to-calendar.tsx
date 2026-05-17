"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CalendarPlus, Calendar, Apple, Mail } from "lucide-react"

interface AddToCalendarProps {
  /** Título del evento que aparecerá en el calendario */
  title: string
  /** Descripción / detalles */
  description: string
  /** Dirección o lugar */
  location: string
  /** Fecha de inicio en formato YYYY-MM-DD (hora local de Argentina) */
  startDate: string
  /** Hora de inicio en formato HH:MM (24h, hora local de Argentina) */
  startTime: string
  /** Fecha de fin en formato YYYY-MM-DD */
  endDate: string
  /** Hora de fin en formato HH:MM */
  endTime: string
  /** Identificador único del evento (para el UID del .ics). Ej: "ceremonia" o "fiesta" */
  uid: string
  /** Texto del botón. Default: "Agendar" */
  buttonLabel?: string
}

const TIMEZONE = "America/Argentina/Buenos_Aires"

// Formato Google: YYYYMMDDTHHMMSS (en hora local) + parámetro ctz
function fmtGoogle(date: string, time: string) {
  return `${date.replace(/-/g, "")}T${time.replace(":", "")}00`
}

// Formato Outlook: ISO con offset explícito de Argentina (-03:00)
function fmtOutlook(date: string, time: string) {
  return `${date}T${time}:00-03:00`
}

// Escapar texto para .ics según RFC 5545
function escapeIcs(text: string) {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n")
}

export function AddToCalendar({
  title,
  description,
  location,
  startDate,
  startTime,
  endDate,
  endTime,
  uid,
  buttonLabel = "Agendar",
}: AddToCalendarProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Google: ctz=America/Argentina/Buenos_Aires fija la zona horaria
  const googleUrl =
    `https://calendar.google.com/calendar/render?action=TEMPLATE` +
    `&text=${encodeURIComponent(title)}` +
    `&dates=${fmtGoogle(startDate, startTime)}/${fmtGoogle(endDate, endTime)}` +
    `&ctz=${encodeURIComponent(TIMEZONE)}` +
    `&details=${encodeURIComponent(description)}` +
    `&location=${encodeURIComponent(location)}`

  const outlookUrl =
    `https://outlook.live.com/calendar/0/action/compose?subject=${encodeURIComponent(title)}` +
    `&body=${encodeURIComponent(description)}` +
    `&location=${encodeURIComponent(location)}` +
    `&startdt=${fmtOutlook(startDate, startTime)}` +
    `&enddt=${fmtOutlook(endDate, endTime)}`

  const downloadIcs = () => {
    // VTIMEZONE explícita para Buenos Aires (UTC-3) — clave para iOS/macOS
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Coni & Nico Wedding//ES",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VTIMEZONE",
      `TZID:${TIMEZONE}`,
      "BEGIN:STANDARD",
      "DTSTART:19700101T000000",
      "TZOFFSETFROM:-0300",
      "TZOFFSETTO:-0300",
      "TZNAME:ART",
      "END:STANDARD",
      "END:VTIMEZONE",
      "BEGIN:VEVENT",
      `UID:boda-coni-nico-${uid}-${startDate}@bodaconinico`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "")}`,
      `DTSTART;TZID=${TIMEZONE}:${fmtGoogle(startDate, startTime)}`,
      `DTEND;TZID=${TIMEZONE}:${fmtGoogle(endDate, endTime)}`,
      `SUMMARY:${escapeIcs(title)}`,
      `DESCRIPTION:${escapeIcs(description)}`,
      `LOCATION:${escapeIcs(location)}`,
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n") // RFC 5545 exige CRLF

    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" })
    const url = URL.createObjectURL(blob)

    // En iOS Safari, abrir en una pestaña nueva funciona mejor que el truco del <a>
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
    if (isIOS) {
      window.location.href = url
    } else {
      const link = document.createElement("a")
      link.href = url
      link.download = `boda-coni-nico-${uid}.ics`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }

    // Liberar memoria un poco después (iOS necesita tiempo)
    setTimeout(() => URL.revokeObjectURL(url), 5000)
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
        >
          <CalendarPlus className="w-5 h-5 mr-2" />
          {buttonLabel}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-52">
        <DropdownMenuItem asChild>
          <a
            href={googleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Google Calendar
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={downloadIcs} className="cursor-pointer">
          <Apple className="w-4 h-4 mr-2" />
          Apple Calendar
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a
            href={outlookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer"
          >
            <Mail className="w-4 h-4 mr-2" />
            Outlook
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}