"use client";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// ── Styles ─────────────────────────────────────────────────────────────────
const S = StyleSheet.create({
  page: {
    backgroundColor: "#F9F8F6",
    fontFamily: "Helvetica",
    paddingTop: 48,
    paddingBottom: 56,
    paddingHorizontal: 48,
  },

  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 32,
    paddingBottom: 20,
    borderBottomWidth: 1.5,
    borderBottomColor: "#8B1A2F",
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  logoText: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    color: "#8B1A2F",
    letterSpacing: -0.5,
  },
  headerRight: {
    alignItems: "flex-end",
  },
  headerLabel: {
    fontSize: 7,
    color: "#787878",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    marginBottom: 3,
  },
  headerDate: {
    fontSize: 9,
    color: "#3D3D3D",
    fontFamily: "Helvetica-Bold",
  },

  // Title block
  titleBlock: {
    marginBottom: 24,
  },
  eyebrow: {
    fontSize: 7,
    letterSpacing: 2,
    color: "#8B1A2F",
    textTransform: "uppercase",
    marginBottom: 6,
  },
  title: {
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
    color: "#0F0F0F",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 10,
    color: "#787878",
    lineHeight: 1.5,
  },

  // Filter summary
  filterRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 24,
    flexWrap: "wrap",
  },
  filterChip: {
    backgroundColor: "#8B1A2F",
    borderRadius: 99,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  filterChipText: {
    fontSize: 8,
    color: "#FFFFFF",
    fontFamily: "Helvetica-Bold",
    letterSpacing: 0.5,
  },
  filterChipEmpty: {
    backgroundColor: "#E8E3DB",
    borderRadius: 99,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  filterChipEmptyText: {
    fontSize: 8,
    color: "#787878",
  },

  // Table
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#0F0F0F",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 9,
    marginBottom: 6,
  },
  tableHeaderCell: {
    fontSize: 7,
    fontFamily: "Helvetica-Bold",
    color: "#F9F8F6",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  tableRow: {
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 11,
    borderRadius: 6,
    marginBottom: 4,
    alignItems: "center",
  },
  tableRowEven: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E0D8",
  },
  tableRowOdd: {
    backgroundColor: "#F0EDE8",
  },
  tableCell: {
    fontSize: 9,
    color: "#3D3D3D",
  },
  tableCellBold: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: "#0F0F0F",
  },

  // Blood group badge in table
  bloodBadge: {
    borderRadius: 5,
    paddingHorizontal: 6,
    paddingVertical: 2,
    backgroundColor: "#8B1A2F",
    alignSelf: "flex-start",
  },
  bloodBadgeText: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: "#FFFFFF",
  },

  // Available dot
  availableDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#16a34a",
    marginRight: 4,
  },
  availableRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  availableText: {
    fontSize: 8,
    color: "#16a34a",
    fontFamily: "Helvetica-Bold",
  },
  unavailableText: {
    fontSize: 8,
    color: "#787878",
  },

  // Column widths (must sum to 100%)
  colIndex:     { width: "6%"  },
  colName:      { width: "22%" },
  colBlood:     { width: "10%" },
  colDistrict:  { width: "18%" },
  colUpazila:   { width: "18%" },
  colDonated:   { width: "16%" },
  colStatus:    { width: "10%" },

  // Footer
  footer: {
    position: "absolute",
    bottom: 24,
    left: 48,
    right: 48,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#E5E0D8",
  },
  footerText: {
    fontSize: 7,
    color: "#B0ABA4",
  },
  footerBrand: {
    fontSize: 7,
    fontFamily: "Helvetica-Bold",
    color: "#8B1A2F",
    letterSpacing: 0.5,
  },
  pageNumber: {
    fontSize: 7,
    color: "#B0ABA4",
  },

  // Summary bar
  summaryBar: {
    flexDirection: "row",
    gap: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E0D8",
    borderRadius: 8,
    padding: 14,
    marginBottom: 20,
  },
  summaryItem: {
    alignItems: "center",
    flex: 1,
  },
  summaryValue: {
    fontSize: 16,
    fontFamily: "Helvetica-Bold",
    color: "#8B1A2F",
    marginBottom: 2,
  },
  summaryLabel: {
    fontSize: 7,
    color: "#787878",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  summaryDivider: {
    width: 1,
    backgroundColor: "#E5E0D8",
  },
});

// ── Helpers ────────────────────────────────────────────────────────────────
function formatDate(dateStr) {
  if (!dateStr) return "N/A";
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

function getAvailableCount(donors) {
  return donors.filter((d) => d.available !== false).length;
}

// ── PDF Document ───────────────────────────────────────────────────────────
export default function DonorPDF({ donors = [], filters = {} }) {
  const generatedAt = new Date().toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const available = getAvailableCount(donors);

  return (
    <Document
      title="Vitae — Donor Search Results"
      author="Vitae Blood Donation Platform"
      subject="Blood Donor List"
    >
      <Page size="A4" orientation="landscape" style={S.page}>

        {/* ── Header ──────────────────────────────────────── */}
        <View style={S.header}>
          <View style={S.logoRow}>
            <Text style={S.logoText}>Vitae</Text>
            <Text style={{ fontSize: 9, color: "#787878", marginTop: 4 }}>
              Blood Donation Platform · Bangladesh
            </Text>
          </View>
          <View style={S.headerRight}>
            <Text style={S.headerLabel}>Generated on</Text>
            <Text style={S.headerDate}>{generatedAt}</Text>
          </View>
        </View>

        {/* ── Title ───────────────────────────────────────── */}
        <View style={S.titleBlock}>
          <Text style={S.eyebrow}>Donor Search Results</Text>
          <Text style={S.title}>Available Blood Donors</Text>
          <Text style={S.subtitle}>
            Search results from the Vitae platform for your selected filters.
            All donors listed are registered and verified.
          </Text>
        </View>

        {/* ── Active filters ───────────────────────────────── */}
        <View style={S.filterRow}>
          {filters.bloodGroup ? (
            <View style={S.filterChip}>
              <Text style={S.filterChipText}>Blood: {filters.bloodGroup}</Text>
            </View>
          ) : (
            <View style={S.filterChipEmpty}>
              <Text style={S.filterChipEmptyText}>All blood groups</Text>
            </View>
          )}
          {filters.district ? (
            <View style={S.filterChip}>
              <Text style={S.filterChipText}>District: {filters.district}</Text>
            </View>
          ) : (
            <View style={S.filterChipEmpty}>
              <Text style={S.filterChipEmptyText}>All districts</Text>
            </View>
          )}
          {filters.upazila ? (
            <View style={S.filterChip}>
              <Text style={S.filterChipText}>Upazila: {filters.upazila}</Text>
            </View>
          ) : null}
        </View>

        {/* ── Summary stats ────────────────────────────────── */}
        <View style={S.summaryBar}>
          <View style={S.summaryItem}>
            <Text style={S.summaryValue}>{donors.length}</Text>
            <Text style={S.summaryLabel}>Total Found</Text>
          </View>
          <View style={S.summaryDivider} />
          <View style={S.summaryItem}>
            <Text style={[S.summaryValue, { color: "#16a34a" }]}>{available}</Text>
            <Text style={S.summaryLabel}>Available</Text>
          </View>
          <View style={S.summaryDivider} />
          <View style={S.summaryItem}>
            <Text style={[S.summaryValue, { color: "#787878" }]}>
              {donors.length - available}
            </Text>
            <Text style={S.summaryLabel}>Unavailable</Text>
          </View>
          <View style={S.summaryDivider} />
          <View style={S.summaryItem}>
            <Text style={S.summaryValue}>
              {[...new Set(donors.map((d) => d.bloodGroup))].join(", ") || "—"}
            </Text>
            <Text style={S.summaryLabel}>Blood Types</Text>
          </View>
        </View>

        {/* ── Table header ─────────────────────────────────── */}
        <View style={S.tableHeader}>
          <Text style={[S.tableHeaderCell, S.colIndex]}>#</Text>
          <Text style={[S.tableHeaderCell, S.colName]}>Name</Text>
          <Text style={[S.tableHeaderCell, S.colBlood]}>Blood</Text>
          <Text style={[S.tableHeaderCell, S.colDistrict]}>District</Text>
          <Text style={[S.tableHeaderCell, S.colUpazila]}>Upazila</Text>
          <Text style={[S.tableHeaderCell, S.colDonated]}>Last Donated</Text>
          <Text style={[S.tableHeaderCell, S.colStatus]}>Status</Text>
        </View>

        {/* ── Table rows ───────────────────────────────────── */}
        {donors.length === 0 ? (
          <View style={{ padding: 24, alignItems: "center" }}>
            <Text style={{ fontSize: 10, color: "#787878" }}>
              No donors found for the selected filters.
            </Text>
          </View>
        ) : (
          donors.map((donor, i) => (
            <View
              key={donor._id || i}
              style={[S.tableRow, i % 2 === 0 ? S.tableRowEven : S.tableRowOdd]}
            >
              <Text style={[S.tableCell, S.colIndex, { color: "#B0ABA4" }]}>
                {String(i + 1).padStart(2, "0")}
              </Text>
              <Text style={[S.tableCellBold, S.colName]}>{donor.name || "—"}</Text>
              <View style={S.colBlood}>
                <View style={S.bloodBadge}>
                  <Text style={S.bloodBadgeText}>{donor.bloodGroup || "—"}</Text>
                </View>
              </View>
              <Text style={[S.tableCell, S.colDistrict]}>{donor.district || "—"}</Text>
              <Text style={[S.tableCell, S.colUpazila]}>{donor.upazila || "—"}</Text>
              <Text style={[S.tableCell, S.colDonated]}>
                {formatDate(donor.lastDonated)}
              </Text>
              <View style={[S.colStatus]}>
                {donor.available !== false ? (
                  <View style={S.availableRow}>
                    <View style={S.availableDot} />
                    <Text style={S.availableText}>Available</Text>
                  </View>
                ) : (
                  <Text style={S.unavailableText}>Unavailable</Text>
                )}
              </View>
            </View>
          ))
        )}

        {/* ── Footer ──────────────────────────────────────── */}
        <View style={S.footer} fixed>
          <Text style={S.footerBrand}>VITAE</Text>
          <Text style={S.footerText}>
            This document is generated from the Vitae Blood Donation Platform.
            For verified data only.
          </Text>
          <Text
            style={S.pageNumber}
            render={({ pageNumber, totalPages }) =>
              `Page ${pageNumber} / ${totalPages}`
            }
          />
        </View>
      </Page>
    </Document>
  );
}