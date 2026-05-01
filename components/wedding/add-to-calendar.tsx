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

const EVENT = {
  title: "Boda de Coni & Nico",
  description:
    "Ceremonia en Parroquia Nuestra Señora del Valle, seguida de fiesta en Terrazas de San José, Yerba Buena, Tucumán, Argentina.",
  location: "Yerba Buena, Tucumán, Argentina",
  // 👇 Fechas en formato local de Argentina (UTC-3)
  startDate: "2026-08-15",
  startTime: "16:00",
  endDate: "2026-08-16",
  endTime: "01:00",
  timezone: "America/Argentina/Buenos_Aires",
} as const

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

export function AddToCalendar() {
  const [isOpen, setIsOpen] = useState(false)

  // Google: ctz=America/Argentina/Buenos_Aires fija la zona horaria
  const googleUrl =
    `https://calendar.google.com/calendar/render?action=TEMPLATE` +
    `&text=${encodeURIComponent(EVENT.title)}` +
    `&dates=${fmtGoogle(EVENT.startDate, EVENT.startTime)}/${fmtGoogle(EVENT.endDate, EVENT.endTime)}` +
    `&ctz=${encodeURIComponent(EVENT.timezone)}` +
    `&details=${encodeURIComponent(EVENT.description)}` +
    `&location=${encodeURIComponent(EVENT.location)}`

  const outlookUrl =
    `https://outlook.live.com/calendar/0/action/compose?subject=${encodeURIComponent(EVENT.title)}` +
    `&body=${encodeURIComponent(EVENT.description)}` +
    `&location=${encodeURIComponent(EVENT.location)}` +
    `&startdt=${fmtOutlook(EVENT.startDate, EVENT.startTime)}` +
    `&enddt=${fmtOutlook(EVENT.endDate, EVENT.endTime)}`

  const downloadIcs = () => {
    // VTIMEZONE explícita para Buenos Aires (UTC-3) — clave para iOS/macOS
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Coni & Nico Wedding//ES",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VTIMEZONE",
      `TZID:${EVENT.timezone}`,
      "BEGIN:STANDARD",
      "DTSTART:19700101T000000",
      "TZOFFSETFROM:-0300",
      "TZOFFSETTO:-0300",
      "TZNAME:ART",
      "END:STANDARD",
      "END:VTIMEZONE",
      "BEGIN:VEVENT",
      `UID:boda-coni-nico-${EVENT.startDate}@bodaconinico`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "")}`,
      `DTSTART;TZID=${EVENT.timezone}:${fmtGoogle(EVENT.startDate, EVENT.startTime)}`,
      `DTEND;TZID=${EVENT.timezone}:${fmtGoogle(EVENT.endDate, EVENT.endTime)}`,
      `SUMMARY:${escapeIcs(EVENT.title)}`,
      `DESCRIPTION:${escapeIcs(EVENT.description)}`,
      `LOCATION:${escapeIcs(EVENT.location)}`,
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
      link.download = "boda-coni-nico.ics"
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
          Agendar
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